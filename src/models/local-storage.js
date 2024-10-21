import { Project, Task } from "./index.js";

// Private fields are not included when using JSON.stringify().
// So extract the necessary data using the public getters 
// to create a serializable object for storage.
export function storeInLocalStorage(projects) {
    const projectsData = projects.map(project => ({
        id: project.id,
        title: project.title,
        tasks: getTasks(project),

    }));

    // Same thing needs to be done for each tasks, since the fields are private
    function getTasks(project) {
        // const tasks = [];
        const tasks = project.tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            status: task.status,
        }));

        return tasks;
    }

    localStorage.setItem("projects", JSON.stringify(projectsData));
}


export function loadProjectsFromStorage() {
    const projectsData = localStorage.getItem('projects');
    const parsedProjects = projectsData ? JSON.parse(projectsData) : [];

    // Since, the projects weren't actually stored, 
    // each project needs to be recreated as an instance of the Project class
    return parsedProjects.map(proj => {
        const project = new Project(proj.title); 
        project.id = proj.id;  

        // Same thing for the tasks within the project
        if (Array.isArray(proj.tasks)) {
            // Recreate each task, and store them in an array
            const tasks = proj.tasks.map(task => {

                const recreatedTask = new Task({  // create a new task instance
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                    priority: task.priority
                });

                recreatedTask.id = task.id;
                recreatedTask.status = task.status;
                return recreatedTask;
            });
            project.tasks = tasks;
        }
        return project;
    });
}

export function isStorageEmpty() {
    const projects = loadProjectsFromStorage();
    return projects.length === 0;
}


// shows the saved projects on local storage
// export function showSavedProjects() {
//     const projectList = loadProjectsFromStorage();
//     projectList.forEach(project => displayProject(projectContainer, project));
// }
