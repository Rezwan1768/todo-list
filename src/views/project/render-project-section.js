export function renderProjectSection(element) {
    element.innerHTML = `
        <div class="header">
            <p>Projects</p>
            <button type="button" class="new-project">New</button>
        </div>
        <form action="" class="hidden" >
            <div class="name-field">
                <label for="project-title">Name:</label>
                <input type="text" id="project-title" name="project-title" maxlength="50"
                    required placeholder="Project Name">
                <button type="submit" class="add-project">Add</button>
            </div>
        </form>
        <div class="project-container"> </div>
    `
}