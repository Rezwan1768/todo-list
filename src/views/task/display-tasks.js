import { projectList, Task } from "../../models";
import { createTask } from "./create-task.js";
import { clearElementContent } from "../../utils/utility";

const taskContainer = document.querySelector("div.task-container");

// Displays existing tasks of a project
export function displayTasks(projectId) {
    const project = projectList.getProject(projectId);
    
    // seperate the completed tasks from uncompleted task.
    // This is because I want to display the uncompleted tasks first
    const uncompletedTasks = [];
    const completedTasks = [];

    project.tasks.forEach(task => {
        //console.log(task);
        if(task.status) {
            completedTasks.push(task);
        } else {
            uncompletedTasks.push(task);
        }
    });

    const allTasks = uncompletedTasks.concat(completedTasks);
    taskContainer.innerHTML = "";

    // Displays the existing tasks of the project, first the uncompleted ones
    if (allTasks.length !== 0) {
        const label = document.createElement("div");
        label.classList.add("label");
        label.innerHTML = `
            <p>Title</p>
            <p>Due Date</p>
            <p>Priority</p>
        `
        taskContainer.appendChild(label);
        allTasks.forEach(task =>
            createTask(task, projectId)
        );
    } else {
        // Display a message and a button to add tasks when the project has no tasks
        taskContainer.innerHTML = `
            <div class="add-task-message">
                <div>
                    <p>This project does not have any tasks.</p>
                    <button class="empty-task">Add Task</button>
                <div>
            </div>
         `

        // Show the form for adding task on the button click
        const button = document.querySelector("button.empty-task");
        const dialog = document.querySelector("dialog");
        button.addEventListener("click", () => dialog.showModal());
    }
}

// New task is created from the form data, upon form submission
export function addNewTask(projectId, taskInfo) {
    const project = projectList.getProject(projectId);
    if (project) {
        // A project with not tasks displays a message to add task. The 
        // message is cleared before adding the first task.
        if (project.isTasksEmpty()) {
            taskContainer.innerHTML = "";
        }
        const task = new Task(taskInfo);
        project.addTask(task);
        createTask(task, projectId);
    }
}
