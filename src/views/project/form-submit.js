import { Project, projectList, storeInLocalStorage } from "../../models";
import { displayProject } from "./display-project";

export function handleInput(form, projectContainer) {
    form.addEventListener("submit", event => {
        event.preventDefault();

        // Get the input value directly. No need to create a formData object 
        // since the form only has one input field.
        const projectName = document.querySelector("#project-title").value;
        if (projectName) {
            const project = new Project(projectName);
            // Add project to projectList to keep track of it
            projectList.addProject(project);

            // Save project in loal storage
            storeInLocalStorage(projectList.getAllProjects());
            displayProject(projectContainer, project);

            
            // When a new project is added, the button content is changed to 
            // "Cancel". Change it back to "New",
            const newProjectBtn = document.querySelector("button.new-project");
            newProjectBtn.textContent = "New";

        }
        form.reset();
        form.classList.toggle("hidden");
    })
}

