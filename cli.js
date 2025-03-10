#!/usr/bin/env node

'use strict'

const { RuntimeApiClient } = require('@platformatic/control')
const { select } = require('@inquirer/prompts')

async function main() {
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
        console.log(`Using runtime: ${runtime.packageName || 'unnamed'} (PID: ${runtime.pid})`)
        return runtime
      } else {
        // Multiple runtimes, prompt user to select one
        const choices = runtimes.map(runtime => ({
          name: `${runtime.packageName || 'unnamed'} (PID: ${runtime.pid})`,
          value: runtime,
          description: runtime.startTime ? `Started at ${new Date(runtime.startTime).toLocaleString()}` : ''
        }))
        
        // Prompt the user to select a runtime
        const selectedRuntime = await select({
          message: 'Select a runtime:',
          choices
        })
        
        console.log(`Selected runtime: ${selectedRuntime.packageName || 'unnamed'} (PID: ${selectedRuntime.pid})`)
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
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
} else {
  // Export for use as a module
  module.exports = main
}
