#!/usr/bin/env node

'use strict'

const { RuntimeApiClient } = require('@platformatic/control')
const { select } = require('@inquirer/prompts')
const { start } = require('./lib/start')

async function getLocationDetails (client, runtime) {
  try {
    // Try to get the runtime config
    const config = await client.getRuntimeConfig(runtime.pid)

    // Log the config object to help debug what properties are available
    // console.log('Runtime config:', JSON.stringify(config, null, 2));

    // Check various possible properties where the config path might be stored
    let configPath = 'Unknown'
    if (config.path) {
      configPath = config.path
    } else if (config.configFile) {
      configPath = config.configFile
    } else if (config.server && config.server.path) {
      configPath = config.server.path
    } else if (runtime.configPath) {
      configPath = runtime.configPath
    }

    return {
      configPath,
      cwd: runtime.cwd || 'Unknown'
    }
  } catch (error) {
    // console.error('Error fetching config:', error.message);
    return {
      configPath: 'Unknown (config not available)',
      cwd: runtime.cwd || 'Unknown'
    }
  }
}

async function main () {
  try {
    // Get available runtimes
    const client = new RuntimeApiClient()

    try {
      const runtimes = await client.getRuntimes()

      if (runtimes.length === 0) {
        console.log('No runtimes available. Please start a Platformatic runtime first.')
        return null
      } else if (runtimes.length === 1) {
        // Only one runtime, no need to prompt
        const runtime = runtimes[0]
        const locationDetails = await getLocationDetails(client, runtime)
        // Display information about the runtime
        console.log('\nRuntime Details:')
        console.log(`Name: ${runtime.packageName || 'unnamed'}`)
        console.log(`PID: ${runtime.pid}`)
        console.log(`Working directory: ${locationDetails.cwd}`)

        if (locationDetails.configPath !== 'Unknown' &&
            locationDetails.configPath !== 'Unknown (config not available)') {
          console.log(`Configuration path: ${locationDetails.configPath}`)
        }

        // If we have any command line arguments, display them
        if (runtime.argv && runtime.argv.length > 0) {
          console.log(`Command: ${runtime.argv.join(' ')}`)
        }

        // If we have a start time, display it
        if (runtime.startTime) {
          console.log(`Started at: ${new Date(runtime.startTime).toLocaleString()}`)
        }
        return runtime
      } else {
        // Multiple runtimes, prompt user to select one

        // Prepare the runtime choices with async map
        const choicesPromises = runtimes.map(async runtime => {
          // Create a concise description that helps identify this runtime
          const description = []

          // Show working directory as it's usually the most useful identifier
          description.push(`Dir: ${runtime.cwd || 'Unknown'}`)

          // Add the start time if available
          if (runtime.startTime) {
            description.push(`Started: ${new Date(runtime.startTime).toLocaleString()}`)
          }

          return {
            name: `${runtime.packageName || 'unnamed'} (PID: ${runtime.pid})`,
            value: runtime,
            description: description.join(', ')
          }
        })

        // Wait for all async operations to complete
        const choices = await Promise.all(choicesPromises)

        // Prompt the user to select a runtime
        const selectedRuntime = await select({
          message: 'Select a runtime:',
          choices
        })

        const locationDetails = await getLocationDetails(client, selectedRuntime)
        // Display information about the selected runtime
        console.log('\nRuntime Details:')
        console.log(`Name: ${selectedRuntime.packageName || 'unnamed'}`)
        console.log(`PID: ${selectedRuntime.pid}`)
        console.log(`Working directory: ${locationDetails.cwd}`)

        if (locationDetails.configPath !== 'Unknown' &&
            locationDetails.configPath !== 'Unknown (config not available)') {
          console.log(`Configuration path: ${locationDetails.configPath}`)
        }

        // If we have any command line arguments, display them
        if (selectedRuntime.argv && selectedRuntime.argv.length > 0) {
          console.log(`Command: ${selectedRuntime.argv.join(' ')}`)
        }

        // If we have a start time, display it
        if (selectedRuntime.startTime) {
          console.log(`Started at: ${new Date(selectedRuntime.startTime).toLocaleString()}`)
        }
        return selectedRuntime
      }
    } finally {
      // Always clean up the client
      await client.close()
    }
  } catch (error) {
    console.error('Error:', error.message)
    return null
  }
}

// Execute the main function if this script is run directly
if (require.main === module) {
  main().then((selectedRuntime) => {
    return start(selectedRuntime.pid)
  }).catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
} else {
  // Export for use as a module
  module.exports = main
}
