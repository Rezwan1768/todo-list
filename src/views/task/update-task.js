import { projectList } from "../../models";
import { displayTasks } from "./display-tasks.js";


export function updateTask(projectId, taskId, updatedData) {
    const project = projectList.getProject(projectId);
    const task = project.getTask(taskId);

    // Update the task with new form data
    task.title = updatedData.title;
    task.dueDate = updatedData.dueDate;
    task.priority = updatedData.priority;
    task.description = updatedData.description;

    // Re-display the tasks
    displayTasks(projectId);

    
}
