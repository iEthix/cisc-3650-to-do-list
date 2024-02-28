const itemsArray = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : []

console.log(itemsArray)

document.querySelector('#task-form').addEventListener("submit",() => {
    event.preventDefault();
    const item = document.querySelector('#task')
    const date = document.querySelector('#taskdate')
    createTask(item, date)
    displayTasks();
})

function displayTasks() {
    let items = "";
    for(let i = 0; i < itemsArray.length; i++) {
        items += `
        <div class="item">
            <div class="input-controller">
                <textarea disabled>${itemsArray[i].task} (${itemsArray[i].date})</textarea> <!-- Display task and date here -->
                <input type="date" value="${itemsArray[i].date}" style="display: none;">
                <div class="edit-controller">
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            </div>
            <div class="update-controller">
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
        </div>`;
    }
    document.querySelector(".task-list").innerHTML = items;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteTask(i) })
    })
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const textareas = document.querySelectorAll(".input-controller textarea");
    const dateInputs = document.querySelectorAll(".input-controller input[type=date]");

    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            updateController[i].style.display = "flex";
            textareas[i].disabled = false;
            dateInputs[i].style.display = "block";
        });
    });
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn");
    const textareas = document.querySelectorAll(".input-controller textarea");
    const dateInputs = document.querySelectorAll(".input-controller input[type=date]");

    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            const taskText = textareas[i].value.split(" (")[0];
            updateItem(taskText, dateInputs[i].value, i);
        });
    });
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const textareas = document.querySelectorAll(".input-controller textarea");
    const dateInputs = document.querySelectorAll(".input-controller input[type=date]");

    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none";
            textareas[i].disabled = true;
            textareas[i].value = `${itemsArray[i].task} (${itemsArray[i].date})`;
            
            dateInputs[i].style.display = "none";
        });
    });
}

function updateItem(text, date, i) {
    itemsArray[i] = { task: text, date: date };
    localStorage.setItem("task", JSON.stringify(itemsArray));
    location.reload();
}

function deleteTask(i) {
    itemsArray.splice(i,1)
    localStorage.setItem("task", JSON.stringify(itemsArray))
    location.reload()
}

function createTask(item, date) {
    itemsArray.push({task: item.value, date: date.value});
    localStorage.setItem('task', JSON.stringify(itemsArray));
    console.log(itemsArray);
}

function displayDate() {
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}

window.onload = function() {
    displayDate();
    displayTasks();
}
