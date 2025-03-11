'use strict'

const { buildRuntime, loadConfig } = require('@platformatic/runtime')
const { join } = require('path')

async function start (selectedRuntime) {
  process.env.SELECTED_RUNTIME = selectedRuntime
  const configFile = join(__dirname, '..', 'watt.json')
  const { configManager } = await loadConfig({}, ['--config', configFile, '--production'])
  const server = await buildRuntime(configManager)
  await server.start()
}

module.exports.start = start
