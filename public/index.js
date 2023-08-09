const createEditButton = document.querySelector('#postButton')
const inputTask = document.querySelector('#task-name')
const tasksContainer = document.querySelector("#tasks-container")
let TASK_TO_EDIT = null

const baseBackEndUrl = `${window.origin}/api`

console.log({baseBackEndUrl})

createEditButton.addEventListener("click" , function () {
    const creating = !TASK_TO_EDIT
    const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`
    const method = creating ? "POST" : "PUT"
    fetch(`${baseBackEndUrl}/${path}` , {
        method,
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify({text: inputTask.value})
    })
    .then((res) => {
        getTasks()
        inputTask.value = ""
        createEditButton.innerText = "Crear tarea"
        return res.json()
    })
    .then((resJSON) => {
        console.log({resJSON})
    })
})

function getTasks() {
    tasksContainer.innerHTML = null
    fetch(`${baseBackEndUrl}/tasks`)
        .then((res) => res.json())
        .then((resJSON) => {
            const tasks = resJSON.data
            for (const task of tasks) {
                const containerTask = document.createElement('div')
                const taskParagraph = document.createElement('p')
                const deleteTaskBtn = document.createElement('button')
                containerTask.setAttribute('class' , 'container-task')
                deleteTaskBtn.setAttribute('id' , `${task._id}`)
                taskParagraph.innerText = task.name
                deleteTaskBtn.innerText = "Delete"
                deleteTaskBtn.addEventListener('click' , (e) => {
                    const taskID = e.target.id
                    deleteTaskBtn.innerText = "..."
                    fetch(`${baseBackEndUrl}/tasks/${taskID}`, {
                        method: "DELETE",
                    }).then(() => {
                        const taskDiv = deleteTaskBtn.parentElement
                        taskDiv.remove()
                    })
                })
                taskParagraph.addEventListener('click' , (e) => {
                    inputTask.value = task.name
                    createEditButton.innerText = "Editar tarea"
                    TASK_TO_EDIT = task
                    console.log({TASK_TO_EDIT})
                })
                containerTask.appendChild(taskParagraph)
                containerTask.appendChild(deleteTaskBtn)
                tasksContainer.appendChild(containerTask)
            }
    })
}

getTasks()