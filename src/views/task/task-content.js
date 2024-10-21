// date-fns is a library that makes working with dates easier
import { format as dateFnsFormat, parse as dateFnsParse } from "date-fns";
import { capitalize, createElement } from "../../utils/utility";
import { handleDelete, handleEdit, handleComplete } from "./task-control.js";

export function addTaskContent(task, taskItem) {
    // Contents of each task
    taskItem.innerHTML = `
        <div class="task-header">
            <p class="title">${task.title}</p>
            <p>${formatDate(task.dueDate)}</p>
            <p>${capitalize(task.priority)}</p>
        </div>
        <div class="task-details">
            <div class="task-control">
                <button type="button" class="complete-btn">Complete</button>
                <button type="button" class="edit-btn">Edit</button>
                <button type="button" class="delete-btn">Delete</button>
            </div>
        </div>`

    const taskDetails = taskItem.querySelector("div.task-details");
    // Description is optional, if there is one then add it to be displayed
    if (task.description) {
        const description = createElement("p", "task-description");
        description.textContent = task.description;
        taskDetails.insertBefore(description, taskDetails.firstElementChild);
    }

    // Add event listeners to the 3 buttons for edit, delete, and completion 
    const deleteBtn = taskDetails.querySelector(".delete-btn");
    const editBtn = taskDetails.querySelector(".edit-btn");
    const completeBtn = taskDetails.querySelector(".complete-btn");

    if (taskItem.classList.contains("completed-task")) {
        editBtn.disabled = "true";
        completeBtn.textContent = "Undo";
    }

    deleteBtn.addEventListener("click", () => handleDelete(taskItem));

    editBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        handleEdit(taskItem);
    });

    completeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        handleComplete(taskItem);
    });
}

// Date is returned as "Today", "Tomorrow", or in "mm-dd-yyyy"
function formatDate(dateString) {
    if (!dateString) {
        return "No due-date"
    }
    const todaysDate = new Date();
    const tomorrowsDate = new Date();
    tomorrowsDate.setDate(todaysDate.getDate() + 1);

    let today = dateFnsFormat(todaysDate, "yyyy-MM-dd");
    let tomorrow = dateFnsFormat(tomorrowsDate, "yyyy-MM-dd");

    if (dateString === today) {
        return "Today";
    } else if (dateString === tomorrow) {
        return "Tomorrow";
    }

    // Change dateString format from "yyyy-mm-dd" to "mm-dd-yyyy"
    let parsedDate = dateFnsParse(dateString, "yyyy-MM-dd", new Date());
    let formatedDate = dateFnsFormat(parsedDate, "MM - dd - yyyy");
    return formatedDate;

}