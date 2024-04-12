Deno.env.set(
  'HALLWAY_API_KEY',
  '713f7cc064f7869b77d19e8d0981378ca7aeab1f6aa12607f509435d93956aee'
)

import Hallway from '../sdk.ts'

// NEW NEW unimplemented
// const highlevel = await Hallway.app('highlevel')
// const actions = await highlevel.actions()
// const getPipelines = await highlevel.actionByName('getPipelines')

const apps = await Hallway.apps.get()
console.log(apps)

const getContact = await Hallway.actions.getByName('highlevel', 'getContact')
console.log(getContact)

const accounts = await Hallway.accounts.getByName('highlevel')
console.log(accounts)

const account = accounts[0]

const contactId = '30v3YOnJ4JhOxXb8sK9Z'

try {
  const val = await getContact.module.default({
    accessToken: account.accessToken,
    contactId,
  })
  console.log('retuuuunrn', val)
} catch (e) {
  console.log('error', e)
}

/*
let sandbox = await Hallway.sandboxes.create()
sandbox.addMessage('Hello World')

console.log(sandbox)

// sandbox = await Hallway.sandboxes.get(sandbox.id)
// console.log(2, sandbox)

// Assuming `Hallway.sandboxes.get` is an async function that retrieves sandbox information
const sandboxId = sandbox.id // Assuming `sandbox` has already been defined and has an `id` property

// Function to fetch and log the sandbox information every second
function logSandboxEverySecond(sandboxId) {
  const intervalId = setInterval(async () => {
    try {
      const sandbox = await Hallway.sandboxes.get(sandboxId)
      console.log('Sandbox data:', sandbox)
    } catch (error) {
      console.error('Failed to fetch sandbox:', error)
      clearInterval(intervalId) // Stop the interval if an error occurs
    }
  }, 1000) // 1000 milliseconds = 1 second

  return () => clearInterval(intervalId) // Return a function to stop the logging
}

// Start logging the sandbox information every second
const stopLogging = logSandboxEverySecond(sandboxId)
*/
//const sandboxes = await Hallway.workflows.create('get newest contacts')

//Hallway.workflows.run('gmail/recent-emails')
