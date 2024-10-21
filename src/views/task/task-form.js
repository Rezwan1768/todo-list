import { format as dateFnsFormat } from "date-fns"; // Makes formating dates easier
import { addNewTask } from "./display-tasks.js";
import { updateTask } from "./update-task.js";
import { projectList, storeInLocalStorage } from "../../models";

const dialog = document.querySelector("dialog");
const form = dialog.querySelector("form");

export function initializeForm() {
    const newTaskBtn = document.querySelector(".task-section button");
    if (newTaskBtn) {
        newTaskBtn.addEventListener("click", () => dialog.showModal());
    }


    const cancelBtn = document.querySelector("button.cancel-task");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => dialog.close());
    }

    setDate();
    handleFormSubmission();
}

// Sets the date inputs 'value' and 'min' attribute to today's date
function setDate() {
    const dateInput = document.querySelector("input#due-date");
    const dateToday = dateFnsFormat(new Date(), "yyyy-MM-dd");
    dateInput.setAttribute("min", `${dateToday}`);
    dateInput.setAttribute("value", `${dateToday}`);
}

export function handleFormSubmission() {
    const addTaskForm = document.querySelector("form.add-task");
    addTaskForm.addEventListener("submit", (event) => handleSubmit(event));

    function handleSubmit(event) {
        //prevent form submission, so JS can be used to handle the form data
        event.preventDefault();

        // FormData: https://developer.mozilla.org/en-US/docs/Web/API/FormData
        const formData = new FormData(event.currentTarget);
        const formDataObject = Object.fromEntries(formData.entries());

        const projectId = addTaskForm.dataset.projectId;

        // If in edit mode, update the existing task, else create a new one
        const isEditMode = addTaskForm.dataset.editMode === "true";
        if (isEditMode) {
            // Update the existing task
            const taskId = addTaskForm.dataset.taskId;
            updateTask(projectId, taskId, formDataObject);
        } else {
            // Add new task
            addNewTask(projectId, formDataObject);
        }
        // Update the storage 
        storeInLocalStorage(projectList.getAllProjects());
        form.reset();
        dialog.close();

        // Reset edit mode for next use
        delete addTaskForm.dataset.editMode;
        delete addTaskForm.dataset.taskId;
    }
}

