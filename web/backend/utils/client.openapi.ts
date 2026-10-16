import fs from 'fs/promises'
import { create } from '@platformatic/service'
import { join, resolve } from 'node:path'

const __dirname = import.meta.dirname

async function clientOpenapi () {
  const basePath = resolve(__dirname, '..')
  const server = await create(basePath, {
    service: { openapi: true },
    watch: false,
    plugins: {
      paths: [
        {
          path: resolve(__dirname, join('..', 'plugins')),
          encapsulate: false
        },
        resolve(__dirname, join('..', 'routes'))
      ]
    }
  })

  await server.start({})
  const { body } = await server.getApplication().inject('/documentation/json')
  await fs.writeFile('openapi.json', body)
  await server.close()
}

clientOpenapi()
