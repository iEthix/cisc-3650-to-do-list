const itemsArray = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : []
const completedTasksArray = localStorage.getItem("completedTask") ? JSON.parse(localStorage.getItem("completedTask")) : []


console.log(itemsArray)
console.log(completedTasksArray)

let editMode = false;
let editIndex = -1;

const taskModal = document.getElementById('taskModal');
const cancelTaskButton = document.getElementById('cancelTask');
const submitTaskButton = document.getElementById('submitTask');
const taskTitleInput = document.getElementById('taskTitle');
const dueDateInput = document.getElementById('dueDate');
const colorButtons = document.querySelectorAll('.colorBtn');
const dueDateLabel = document.getElementById('dueDateLabel');
const modalTitle = document.querySelector('#taskModal h3');

document.querySelector('#newTaskButton').addEventListener('click', () => {
    resetModal();
    taskModal.style.display = 'block';
});

cancelTaskButton.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

document.querySelector('#tasksTab').addEventListener('click', () => {
    displayTasks();
    document.querySelector('#tasksTab').classList.add('active');
    document.querySelector('#completedTab').classList.remove('active');
});

document.querySelector('#completedTab').addEventListener('click', () => {
    displayCompletedTasks();
    document.querySelector('#completedTab').classList.add('active');
    document.querySelector('#tasksTab').classList.remove('active');
});

let selectedColor = 'none';
colorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        selectedColor = e.target.getAttribute('data-color');
        colorButtons.forEach(innerBtn => {
            if (innerBtn === e.target) {
                innerBtn.classList.add('selected');
            } else {
                innerBtn.classList.remove('selected');
            }
        });
    });
});

function displayTasks() {
    let items = "";
    for (let i = 0; i < itemsArray.length; i++) {
        items += `
        <div class="item">
            <input type="checkbox" class="taskCheckbox">
            <div class="task-detail">
                <textarea disabled>${itemsArray[i].task}</textarea>
            </div>
            <div class="update-controller">
                <button class="editBtn">Edit</button>
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
            <div class="task-date-bubble">
                <span class="task-date">${itemsArray[i].date}</span>
            </div>
        </div>`;
    }
    document.querySelector(".task-list").innerHTML = items;
    const urgencies = document.querySelectorAll('.item .task-detail');
    for (let i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].urgency) {
            urgencies[i].style.backgroundColor = itemsArray[i].urgency;
        }
    }
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

document.querySelector('#editSelected').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.taskCheckbox');
    let selectedTasks = 0;
    let selectedIndex = -1;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedTasks++;
            selectedIndex = i;
        }
    }

    if (selectedTasks > 1) {
        alert("You can only edit one task at a time!");
        return;
    } else if (selectedTasks === 1) {
        handleEdit(selectedIndex);
    }
});

function handleEdit(i) {
    modalTitle.innerText = "Edit Task";
    taskTitleInput.value = itemsArray[i].task;
    dueDateInput.value = itemsArray[i].date;
    selectedColor = itemsArray[i].urgency;
    colorButtons.forEach(btn => {
        if (btn.getAttribute('data-color') === selectedColor) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    editMode = true;
    editIndex = i;
    submitTaskButton.textContent = "Update Task";
    taskModal.style.display = 'block';
}

submitTaskButton.addEventListener('click', () => {
    const taskName = taskTitleInput.value;
    const taskDate = dueDateInput.value;

    if (editMode) {
        itemsArray[editIndex] = { task: taskName, date: taskDate, urgency: selectedColor };
        localStorage.setItem('task', JSON.stringify(itemsArray));
        displayTasks();
        editMode = false;
        editIndex = -1;
        taskModal.style.display = 'none';
    } else if (taskName) {
        createTask(taskName, taskDate, selectedColor);
        displayTasks();
        taskModal.style.display = 'none';
    }
});

function activateEditListeners() {
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleEdit(index);
        });
    });
}

cancelTaskButton.addEventListener('click', () => {
    taskModal.style.display = 'none';
    editMode = false;
    editIndex = -1;
    submitTaskButton.textContent = "New Task";
});

function displayCompletedTasks() {
    let items = "";
    for (let i = 0; i < completedTasksArray.length; i++) {
        items += `
        <div class="item">
            <input type="checkbox" class="taskCheckbox">
            <div class="task-detail">
                <textarea disabled class="completed-task">${completedTasksArray[i].task}</textarea>
            </div>
            <div class="update-controller">
                <button class="editBtn">Edit</button>
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
            <div class="task-date-bubble">
                <span class="task-date">${completedTasksArray[i].date}</span>
            </div>
        </div>`;
    }
    document.querySelector(".task-list").innerHTML = items;
    const urgencies = document.querySelectorAll('.item .task-detail');
    for (let i = 0; i < completedTasksArray.length; i++) {
        if (completedTasksArray[i].urgency) {
            urgencies[i].style.backgroundColor = completedTasksArray[i].urgency;
        }
    }
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

function createTask(item, date, urgency) {
    itemsArray.push({task: item, date: date, urgency: urgency});
    localStorage.setItem('task', JSON.stringify(itemsArray));
    displayTasks();
}

function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('.taskCheckbox');
    let currentArray;
    let localStorageKey;

    if (document.querySelector('#tasksTab').classList.contains('active')) {
        currentArray = itemsArray;
        localStorageKey = 'task';
    } else {
        currentArray = completedTasksArray;
        localStorageKey = 'completedTask';
    }

    let i = currentArray.length;
    while (i--) {
        if (checkboxes[i].checked) {
            currentArray.splice(i, 1);
        }
    }

    localStorage.setItem(localStorageKey, JSON.stringify(currentArray));

    if (localStorageKey === 'task') {
        displayTasks();
    } else {
        displayCompletedTasks();
    }
}

function markTasksAsCompleted() {
    const checkboxes = document.querySelectorAll('.taskCheckbox');
    for(let i = checkboxes.length - 1; i >= 0; i--) {
        if(checkboxes[i].checked) {
            completedTasksArray.push(itemsArray[i]);
            itemsArray.splice(i, 1);
        }
    }

    localStorage.setItem('task', JSON.stringify(itemsArray));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasksArray));

    displayTasks();
}

document.querySelector('#deleteSelected').addEventListener('click', deleteSelectedTasks);

document.querySelector('#markAsCompleted').addEventListener('click', markTasksAsCompleted);

function displayDate() {
    let date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    document.querySelector("#date").innerHTML = formattedDate;
}

dueDateInput.addEventListener('input', () => {
    if (dueDateInput.value) {
        dueDateLabel.textContent = 'Clear';
        dueDateLabel.style.color = 'blue';
        dueDateLabel.style.cursor = 'pointer';
    } else {
        dueDateLabel.textContent = '(no due date)';
        dueDateLabel.style.color = 'initial';
        dueDateLabel.style.cursor = 'default';
    }
});

dueDateLabel.addEventListener('click', () => {
    if (dueDateInput.value) {
        dueDateInput.value = '';
        dueDateLabel.textContent = '(no due date)';
        dueDateLabel.style.color = 'initial';
        dueDateLabel.style.cursor = 'default';
    }
});

function resetModal() {
    modalTitle.innerText = "Create New Task";
    taskTitleInput.value = '';
    dueDateInput.value = '';
    selectedColor = 'none';
    colorButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    submitTaskButton.textContent = "New Task";
    editMode = false;
    editIndex = -1;
}

window.onload = function() {
    displayDate();
    displayTasks();
}
