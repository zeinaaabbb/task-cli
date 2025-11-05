import tasksJson from './tasks.json' assert { type: 'json' };
import process from 'process';

function list() {
    tasksJson.tasks.forEach(task => {
        console.log([task.id], task.description, "--", task.status)
    })
}

list();

// get the description text. If empty show error DONE
// find the tasks.json DONE
// if task.json doesnt exisit, be an empty list of task 
// if task.json exisits read it DONE
// if there is no task use 1 
// otherwise finding the biggest exisiting ID and add 1
// get the current time 
// use it for the createAT and updateAt 

function add(description) {
    if (!description || !description.trim()){
        console.log("Please enter a description!");
        process.exit(1)
    }

    if (tasksJson){
        const tasks = tasksJson.tasks

        const largestId = Math.max(...tasks.map(t => t.id))
        console.log(largestId)

        tasks.forEach(task => {
            const taskId = task.id
            if (!taskId) {
                console.log("No tasks exisit!")
                const taskId = 1
                console.log("test:", taskId, description)
            }
        })   

    }
}

const argumentList = process.argv.slice(2)
const command = argumentList[0]
const description = argumentList.slice(1).join(" ")

if (command === "add"){
    add(description);
}
// get all the words the user typed in the terminal after node index.js
// the first word after the index.js is the command 
// Everuthing after the command is joined together into one string
// the command is is add 
// call the add() function and give it the description from the string above(" ")

add()



