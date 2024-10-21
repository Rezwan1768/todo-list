import { createElement } from "../../utils/utility";
import { addTaskContent } from "./task-content.js";

export function createTask(task, projectId) {
    const taskContainer = document.querySelector("div.task-container");

    // Tasks will be displayed within a large button, since the tasks can be
    // expanded/collapsed on click, button proveds semantic meaning.
    const taskItem = createElement("button", "task-item");
    // Add both the task-id and project-id to each task for identification
    taskItem.setAttribute("data-id", task.id); 
    taskItem.setAttribute("data-project-id", projectId);
    
    // Completed tasks will be marked with the "completed-task" class.
    if(task.status) {
        taskItem.classList.add("completed-task");
    }
    addTaskContent(task, taskItem);
    
    // Tasks can expand/collapse on click
    taskItem.addEventListener("click", () => taskItem.classList.toggle("expanded"));
    taskContainer.appendChild(taskItem);
}

