import { displayTasks } from "../task/display-tasks.js";

export function handleProjectClick(projectContainer, projectButton) {
    // Remove the 'selected' class from any currently selected proejct button
    const currentlySelected = projectContainer.querySelector(".project.selected");
    if (currentlySelected) {
        currentlySelected.classList.remove("selected");
    }

    // Add 'selected' class to the clicked project button,
    // Used to visually identify current selected project
    projectButton.classList.add("selected");

    // Add the project-id to the task-form, so any new taks created can be added
    // to the currently selected poject
    const projectId = projectButton.dataset.id;
    const addTaskForm = document.querySelector("form.add-task");
    addTaskForm.setAttribute("data-project-id", projectId);

    // Display the projet title and a button for adding tasks on top of the task section
    const projectTitleDom = document.querySelector(".task-section .project-title");
    const projectTitle = projectButton.querySelector("p.title").textContent;
    projectTitleDom.textContent = projectTitle;
    displayTasks(projectId); // Display the tasks for the selected project
}
