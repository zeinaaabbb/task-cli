import process from 'process';
import fs from 'fs'

function list() {
        try {
            const data = fs.readFileSync('tasks.json', 'utf8');
            const tasks = JSON.parse(data)

            tasks.forEach(task => {
                console.log([task.id], task.description, "--", task.status);
            })

            if (tasks.length === 0){
                console.log("There are no tasks available to list. Use 'add' followed by your task description to create a new task entry!");
            }

        } catch (error) {
            console.error("There is an error:", error.message);
            process.exit(1);
        }
}


function add(addDescription) {
    if (!addDescription || !addDescription.trim()){
        console.log("To add a task, please enter a description!");
        process.exit(1);
    }

    const data = fs.readFileSync('tasks.json', 'utf8');
    const tasks = JSON.parse(data);

    if (tasks){
        try {

        let createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();

        if (tasks.length === 0){

            const newTask = {
                "id": 1,
                "description": addDescription,
                "status": "todo",
                "createdAt": createdAt,
                "updatedAt": updatedAt
            }


            tasks.push(newTask);
            fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
            console.log("Task added successfully:", newTask);

        }
        
        if (tasks.length > 0) {
            const largestId = Math.max(...tasks?.map(t => t.id))

            const addNewId = largestId + 1
            const newTask = { 
                "id": addNewId,
                "description": addDescription,
                "status": "todo",
                "createdAt": createdAt,
                "updatedAt": updatedAt
            }

            tasks.push(newTask);
            fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
            console.log("Task added successfully:", newTask);
        }

        } catch (error) {
            console.error("There is an error:", error.message);
        }

    }
}

function update({id, updateDescription}) {
    if (!id) {
        console.log("\nProvide the 'id' of the task you would like to update followed by the new task 'description'\n")
        return list()
    }

    if (!updateDescription) {
        console.log("\nProvide the 'description' of the new task\n")
        return list()
    }

    try {
        const data = fs.readFileSync('tasks.json', 'utf8');
        const tasks = JSON.parse(data);

        const index = tasks.findIndex((t => t.id === id))

        if (index === -1 ){
            console.log("This task id has not been found")
            return list();
        }
        
        const updatedTask = {
            id: tasks[index].id,
            description: updateDescription,
            status: tasks[index].status,
            createdAt: tasks[index].createdAt,
            updatedAt: new Date().toISOString()
        }
        
        tasks[index] = updatedTask
        
        fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
        console.log("Task updated successfully:", updatedTask);

    } catch(error) {
        console.error("There is an error:", error.message);
    }

}

function deleteTask(id) {

    if (!id){
        console.log("Please provide an id of the task you would like to delete")
        list();
    }

    try {
    
    const data = fs.readFileSync('tasks.json', 'utf8');
    const tasks = JSON.parse(data);

    
    const index = tasks.findIndex((t => t.id === id))
    
    if (index === -1 ){
        console.log("This task id has not been found, select from exisiting one")
        return list();
    }
    
    const updatedTask = tasks.filter(t => t.id !==id)

    fs.writeFileSync('./tasks.json', JSON.stringify(updatedTask, null, 2));
    console.log("Task deleted successfully");
    list();

    } catch(error) {
        console.log("There is an error:", error.message)
    }
}


const argumentList = process.argv.slice(2)
const command = argumentList[0]
const id = Number(argumentList[1])
const addDescription = argumentList.slice(1).join(" ")
const updateDescription = argumentList.slice(2).join(" ")

if (command === "add"){
    add(addDescription);
} else if (command === "list"){
    list();
} else if (command === "update"){
    update({ id,  updateDescription });
} else if (command === "delete") {
    deleteTask(id);
} else {
    console.log(" :) Your Task Manager:",`\n`, `\n`,"Please select the following commands:",`\n`,"-'list' ",`\n`,"-'add' ", `\n`,"-'update' ", `\n`,"-'delete'" )
}
