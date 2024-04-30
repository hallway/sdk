import H from "../index.ts";

// NEW NEW unimplemented
// const highlevel = await Hallway.app('highlevel')
// const actions = await highlevel.actions()
// const getPipelines = await highlevel.actionByName('getPipelines')





const helloWorld = await H.workflows.getById("2ed3cacf-ed57-4679-bb4b-780133044d26");

let out = await helloWorld.run({input: 'YES'})

console.log(out);


const addOne = await H.workflows.getById("1325f1c2-1c75-4736-8680-8dd6e8953996");

let value = 1
value = await addOne.run({value})
value = await addOne.run({value})
value = await addOne.run({value})
value = await addOne.run({value})
value = await addOne.run({value})
value = await addOne.run({value})
value = await addOne.run({value})


console.log(value);

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
