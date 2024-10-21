import { renderProjectSection } from "./render-project-section.js";
import { displayAllProject } from "./display-project.js"
import { toggleProjectForm } from "./toggle-form.js";
import { handleInput } from "./form-submit.js";

export function initalizeProject() {
    const projectSection = document.querySelector("div.project-section");
    // Attach the project section header, and the hidden form
    renderProjectSection(projectSection);

    const projectForm = projectSection.querySelector("form");
    // show/hide form for adding project name on button click
    toggleProjectForm(projectForm);

    const projectContainer = projectSection.querySelector("div.project-container");
    displayAllProject(projectContainer); // Display any existing projects
    handleInput(projectForm, projectContainer); // Add new project 
}