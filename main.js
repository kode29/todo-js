// Retrieve todo from local storage or initialize an empty array

// Get the local storage array, and/or set up as an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
// Same as $('#todoCount').XYZ

const addButton = document.querySelector(".btn");
// Same as $(".btn").XYZ
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function(){
    addButton.addEventListener("click", addTask);
    // Same as addButton.on("click", addTask)
    todoInput.addEventListener("keydown", function(event){
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayAllTasks();
});

function addTask(){
    const newTask = todoInput.value.trim();
    if (newTask !== ""){
        todo.push({
            task: newTask, 
            disabled: false,
        })
        saveToLocalStorage();
        todoInput.value = "";
        displayAllTasks();
    }
}

function deleteAllTasks(){
    todo = [];
    saveToLocalStorage();
    displayAllTasks();
}

function displayAllTasks(){
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.task}</p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", ()=> {
            toggleTask(index)
        });
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}
function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo));
}

function editTask(index){
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].task;
    const inputElement = document.createElement("input");
    
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
    
    // Default: when the field loses focus
    inputElement.addEventListener("blur", function(){
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].task = updatedText;
            saveToLocalStorage();
        }
        displayAllTasks();
    });
    // Add ability to press "Enter" when typing
    inputElement.addEventListener("keydown", function(event){
        if (event.key === "Enter") {
            event.preventDefault();
            inputElement.blur();
        }
    });
    
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    // automatically do the opposite of the value
    saveToLocalStorage();
    displayAllTasks();
}