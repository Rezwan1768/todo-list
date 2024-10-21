import { Project, projectList, Task, storeInLocalStorage, isStorageEmpty } from "./index.js";

export function createDefaultProject() {
    // Default project will only be created if no projects exists
    if (!isStorageEmpty()) {
        console.log("bang");
        return;
    }

    const defaultProject = new Project("Default Project");
    const defaultTaskOne = new Task({
        title: "Click Me",
        description: "You can add more tasks by clicking the 'add' button above.",
    });
    defaultProject.addTask(defaultTaskOne);

    const defaultTaskTwo = new Task({
        title: "Add More Projects",
        description: "You can add more projects by clicking the 'New' button on the Projects pane.",
    });

    // Since the id is being created using Date.now(), both of the default task
    // end up having the same id. So the id of the second task needs to be manually
    // changed
    defaultTaskTwo.id = String(Number(defaultTaskOne.id + 1));
    
    defaultProject.addTask(defaultTaskTwo);
    projectList.addProject(defaultProject);
    storeInLocalStorage(projectList.getAllProjects()); // Update local storage
}