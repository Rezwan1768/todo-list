export class Project {
    #id;
    #title;
    #tasks

    constructor(title) {
        this.#title = title;
        this.#id = String(Date.now());
        this.#tasks = [];
    }

    set id(id) { this.#id = id; }
    get id() { return this.#id; }
    set title(title) { this.#title = title; }
    get title() { return this.#title; }
    set tasks(tasks) { this.#tasks = tasks; }
    get tasks() { return this.#tasks; }

    addTask(task) {
        this.#tasks.push(task)
    }

    removeTask(taskId) {
        this.#tasks = this.#tasks.filter(task => task.id !== taskId);
        console.log(this.#tasks)
    }

    getTask(taskId) {
        const task = this.#tasks.find(task => task.id === taskId);
        //console.log(task);
        return task;
    }

    isTasksEmpty() {
        return this.#tasks.length === 0;
    }

    removeAllTasks() {
        this.#tasks = [];
    }
}

// Stores all projects and has methods to obtain them
export const projectList = (function () {
    let projects = [];
    function addProject(project) {
        projects.push(project)
    };

    function removeProject(id) {
        let index = projects.findIndex(project => project.id === id);
        if (index !== -1) {
            projects.splice(index, 1);
        }
    };

    function getProject(id) {
        let index = projects.findIndex(project => project.id === id);
        return projects[index];
    }

    function getAllProjects() {
        return projects;
    }

    function setProjects(projs) {
        projects = projs;
    }

    return { addProject, removeProject, getProject, getAllProjects, setProjects };
})();