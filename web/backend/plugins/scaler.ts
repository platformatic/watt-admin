import { RuntimeApiClient } from '@platformatic/control'
import type { FastifyInstance } from 'fastify'
import { MS_WAITING } from '../utils/constants.ts'
import { nextScalerState } from '../utils/scaler.ts'
import type { ScalerState } from '../utils/scaler.ts'

// Polls the scaler of every runtime, so history keeps building while no page is open.
export default async function (fastify: FastifyInstance) {
  const api = new RuntimeApiClient()
  const states = new Map<number, ScalerState>()
  fastify.decorate('scalerStates', states)

  let polling = false
  async function poll (): Promise<void> {
    if (polling) return
    polling = true
    try {
      const runtimes = await api.getRuntimes()
      const live = new Set<number>()
      for (const { pid } of runtimes) {
        live.add(pid)
        try {
          const [scaler, memory] = await Promise.all([
            api.getRuntimeWorkersScaler(pid),
            api.getRuntimeMemory(pid).catch(() => null)
          ])
          states.set(pid, nextScalerState(states.get(pid), scaler, memory))
        } catch (error) {
          fastify.log.debug({ error, pid }, 'Failed to read the workers scaler')
        }
      }
      for (const pid of states.keys()) {
        if (!live.has(pid)) states.delete(pid)
      }
    } catch (error) {
      fastify.log.warn({ error }, 'Failed to poll the workers scalers')
    } finally {
      polling = false
    }
  }

  const interval = setInterval(poll, MS_WAITING)
  fastify.addHook('onClose', async () => {
    clearInterval(interval)
    await api.close()
  })
}
