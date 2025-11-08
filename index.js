import process from 'process';
import fs from 'fs'

function list() {
        try {
            const data = fs.readFileSync('tasks.json', 'utf8');
            const tasks = JSON.parse(data);

            tasks.forEach(task => {
                console.log([task.id], task.description, "--", task.status);
            })

            if (tasks.length === 0){
                console.log("There are no tasks available to list. Use 'add' followed by your task description to create a new task entry!");
            }

        } catch (err) {
            console.error(err);
        }
}


function add(description) {
    if (!description || !description.trim()){
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
                "description": description,
                "status": "todo",
                "createdAt": createdAt,
                "updatedAt": updatedAt
            }


            tasks.push(newTask);
            fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
            console.log("updated successfully:", newTask);

        }
        
        if (tasks.length > 0) {
            const largestId = Math.max(...tasks?.map(t => t.id))

            const addNewId = largestId + 1
            const newTask = { 
                "id": addNewId,
                "description": description,
                "status": "todo",
                "createdAt": createdAt,
                "updatedAt": updatedAt
            }

            tasks.push(newTask);
            fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
            console.log("updated successfully:", newTask);
        }

        } catch (err) {
            console.log(err);
        }

    }
}


const argumentList = process.argv.slice(2)
const command = argumentList[0]
const description = argumentList.slice(1).join(" ")

if (command === "add"){
    add(description);
}

if (command === "list"){
    list();
}



