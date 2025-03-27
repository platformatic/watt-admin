'use strict'

const { buildRuntime, loadConfig } = require('@platformatic/runtime')
const { join } = require('path')

async function start (selectedRuntime) {
  const configFile = join(__dirname, '..', 'watt.json')
  // TODO make the port configurable
  process.env.PORT = 4042
  const { configManager, args } = await loadConfig({
  }, ['--production', '--config', configFile], { production: true })
  configManager.args = args
  const server = await buildRuntime(configManager)
  await server.start()
}

module.exports.start = start
