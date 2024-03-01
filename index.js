const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function createTaskElement(taskText) {
    let li = document.createElement("li");
    li.innerHTML = taskText;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    addTaskEventListeners(li);
}

function addTaskEventListeners(taskElement) {
    taskElement.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
        }
        saveTasksToLocalStorage();
    });

    taskElement.addEventListener("dblclick", function () {
        const currentText = taskElement.textContent;
        const inputField = document.createElement("input");
        inputField.value = currentText;
        inputField.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                const newText = inputField.value.trim();
                if (newText !== "") {
                    taskElement.innerHTML = newText;
                }
                saveTasksToLocalStorage();
            }
        });

        taskElement.innerHTML = "";
        taskElement.appendChild(inputField);
        inputField.focus();
    });
}

function AddTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something");
    } else {
        createTaskElement(inputBox.value);
        saveTasksToLocalStorage();
    }
    inputBox.value = "";
}


window.addEventListener("load", function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function (taskText) {
        createTaskElement(taskText);
    });
});

function saveTasksToLocalStorage() {
    const tasks = Array.from(listContainer.children).map(task => task.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
