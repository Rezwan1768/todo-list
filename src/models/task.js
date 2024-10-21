export class Task {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    status;
    constructor({ title = "Untitled", description = "", dueDate = "", priority = "low" }) {
        this.#id = String(Date.now());
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.status = false;
    }

    set id(id) { this.#id = id; }
    set title(newTitle) { this.#title = newTitle; }
    set description(newDesc) { this.#description = newDesc; }
    set dueDate(newDate) { this.#dueDate = newDate; }
    set priority(priority) { this.#priority = priority; }
    //set status(option) {this.status = option; }
    toggleStatus() { this.status = !this.status;}

    get id() { return this.#id; }
    get title() { return this.#title; }
    get description() { return this.#description; }
    get priority() { return this.#priority; }
    get dueDate() { return this.#dueDate; }
    get status() { return this.status; }

}

