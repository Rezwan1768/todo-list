export function toggleProjectForm(form) {
    // Displays an input for poject name on button click
    const newProjectBtn = document.querySelector("button.new-project");

    newProjectBtn.addEventListener("click", () => {
        // Initally the form is hidden, so first click will show the form
        form.classList.toggle("hidden"); 
        // Alternate the buttons text content on button click
        newProjectBtn.textContent = newProjectBtn.textContent === "New" ? "Cancel" : "New";
       
        // Automatically selects the input field when it's displayed,
        // and clear it's value
        if (!form.classList.contains("hidden")) {
            const projectNameInput = form.querySelector('input#project-title');
            projectNameInput.value = "";
            projectNameInput.focus();
        }
    });
}