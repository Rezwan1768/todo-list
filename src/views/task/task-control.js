import { projectList, storeInLocalStorage } from "../../models";

export function handleDelete(taskItem) {
    const {id: taskId, projectId} = taskItem.dataset;
    const project = projectList.getProject(projectId);
    project.removeTask(taskId);
    taskItem.remove();
    storeInLocalStorage(projectList.getAllProjects());
}

export function handleEdit(taskItem) {
    const { id: taskId, projectId } = taskItem.dataset;
    const project = projectList.getProject(projectId);
    const task = project.getTask(taskId);

    const form = document.querySelector(".add-task");
    const dialog = document.querySelector("dialog");

    // Reshow the form, but the input fields will have the value from the task
    form.querySelector("input[name='title']").value = task.title;
    form.querySelector("input[name='dueDate']").value = task.dueDate;
    form.querySelector("select[name='priority']").value = task.priority;
    form.querySelector("textarea[name='description']").value = task.description;
    form.querySelector("button[type='submit']").textContent = "Ok"; // Set button to "Ok" for editing

    form.dataset.editMode = "true"; // Set edit mode on the form
    form.dataset.taskId = taskId;   // Store taskId on the form for updating the task

    dialog.showModal();
}


export function handleComplete(taskItem) {
    const {id: taskId, projectId} = taskItem.dataset;
    const project = projectList.getProject(projectId);
    const task = project.getTask(taskId);
    task.toggleStatus();  // Mark the task as completed/uncompleted
    console.log(task);
    console.log(taskId);
    // Toggle the 'completed-task' class
    taskItem.classList.toggle("completed-task"); 
    const completeBtn = taskItem.querySelector(".complete-btn");
    const editBtn = taskItem.querySelector(".edit-btn");

    // The button text will change for the completed tasks
    if (task.status) {
        completeBtn.textContent = "Undo";
        editBtn.disabled = true;
    } else {
        completeBtn.textContent = "Complete";
        editBtn.disabled = false;
    }

    // Make sure the task status is presrved
    storeInLocalStorage(projectList.getAllProjects());
}