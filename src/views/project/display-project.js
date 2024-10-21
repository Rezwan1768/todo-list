import { handleProjectClick } from "./handle-click.js";
import { createElement } from "../../utils/utility.js";
import { projectList, storeInLocalStorage, loadProjectsFromStorage } from "../../models";

export function displayProject(projectContainer, project) {
    const projectButton = createElement("button", "project");

    projectButton.dataset.id = project.id; // To identify the project in each button
    projectButton.innerHTML = `
        <p class="title">${project.title}</p>
        <div class="controls">
            <button class="rename-btn">Rename</button>
            <button class="delete-btn">Delete</button>
        </div>
        `
    const renameProjectBtn = projectButton.querySelector(".rename-btn");
    const deleteProjectBtn = projectButton.querySelector(".delete-btn");
    const projectTitleElement = projectButton.querySelector(".project .title");

    // show modal for renmaing the project
    renameProjectBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        // Show a modal input that asks for new name
        const newTitle = prompt("Enter new project name:", project.title); 
        if (newTitle && newTitle.trim()) {
            project.title = newTitle.trim(); // Update project object
            projectTitleElement.textContent = project.title; 
            storeInLocalStorage(projectList.getAllProjects()); // Update storage
        }
    });

    // Delete project on delete button click
    deleteProjectBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        projectButton.remove();
        projectList.removeProject(project.id);
        storeInLocalStorage(projectList.getAllProjects());
        const taskContainer = document.querySelector("div.task-container");
        taskContainer.innerHTML = ""; // Clear the displayed tasks of the project
    });

    // Show project contents on click
    projectButton.addEventListener("click", () =>
        handleProjectClick(projectContainer, projectButton));

    projectContainer.appendChild(projectButton);
    projectButton.click(); // Trigger click event upon adding the project to the DOM
}

// Display all the projects that have been saved 
export function displayAllProject(projectContainer) {
    projectContainer.innerHTML = "";
    projectList.setProjects(loadProjectsFromStorage());
    projectList.getAllProjects().forEach(project => {
        displayProject(projectContainer, project);
    })
}