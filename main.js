const inputField = document.getElementById("inputTodo");
const addBtn = document.getElementById("addBtn");
const navTabs = document.getElementById("nav-tab");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let allTodos = [];
let inputChecks;
let deleteCompletedTodo;

loadFromLocalStorage();
loadAllTodos();

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAllTodos);

/**
 * Function to Save Main Array To LocalStorage
 */
function saveLocalStorage() {
  const data = JSON.stringify(allTodos);
  localStorage.setItem("todos", data);
}

/**
 * Function to load from local Storage to Main Array
 */
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (!data) return;
  allTodos = data;
}

/**
 * Function to load
 * All Todo List
 * In Every Render/Updated
 */
function loadAllTodos() {
  // Create Variables for html ul container to load List Elements
  const list = document.getElementById("all-list");
  const activeList = document.getElementById("active-list");
  const completedList = document.getElementById("conpletedList");
  // Clean ul before loading list elements
  list.innerHTML = "";
  activeList.innerHTML = "";
  completedList.innerHTML = "";
  // Load All Todos List
  allTodos.forEach((todo) => {
    list.innerHTML += `
        <li class="list-group-item " id="${todo.id}">
        <input
        class="form-check-input me-1"
        type="checkbox"
        value=""
        id="${todo.id}"
        ${todo.isCompleted ? "checked" : ""}
        />
        <label class="form-check-label ${
          todo.isCompleted ? "check-line" : ""
        }" for="${todo.id}">
        ${todo.desc}
        </label>
        </li>`;
  });
  // Load Active Todos List
  allTodos
    .filter((todo) => !todo.isCompleted)
    .forEach((todo) => {
      activeList.innerHTML += `
      <li class="list-group-item" id="${todo.id}">
      <input
      class="form-check-input me-1"
      type="checkbox"
      value=""
      id="${todo.id}"
      ${todo.isCompleted ? "checked" : ""}
      />
      <label class="form-check-label ${
        todo.isCompleted ? "check-line" : ""
      }" for="${todo.id}">
      ${todo.desc}
      </label>
      </li>`;
    });
  // Load Completed Todo List
  allTodos
    .filter((todo) => todo.isCompleted)
    .forEach((todo) => {
      completedList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${todo.desc}
          <button type="button" class="btn btn-danger btnDelete" onclick="deleteTodo(${todo.id})">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
              />
            </svg>
          </button>
        </li>`;
    });
  // Load Event Listerner to check input of all item list
  inputChecks = document.querySelectorAll(".form-check-input");
  inputChecks.forEach((inputCheck) => {
    inputCheck.addEventListener("change", toggleChecked);
  });
}

/**
 * Function to be passed as callbacks to event listeners
 * AddTodo: Passed to AddTodo Button Click Event (Add a Todo to Main Array)
 * toggleChecked: Passed to every check input change Event on List Elements in all and active list (Toggle the Completed state of the selected todo)
 * deleteTodo: Passed to every Delete Button Click Event in Completed Todo List (Delete a Todo from main array)
 */
function addTodo() {
  const todoDesc = inputField.value;
  const newTodo = {
    id: new Date().getTime().toString(),
    desc: todoDesc,
    isCompleted: false,
  };
  allTodos.push(newTodo);
  loadAllTodos();
  saveLocalStorage();
  inputField.value = "";
}

function toggleChecked(event) {
  const id = event.target.id;
  const todoToChange = allTodos.findIndex((todo) => todo.id.toString() === id);
  allTodos[todoToChange].isCompleted = !allTodos[todoToChange].isCompleted;
  saveLocalStorage();
  loadAllTodos();
}

function deleteTodo(id) {
  allTodos = allTodos.filter((todo) => todo.id !== id.toString());
  console.log(allTodos);
  saveLocalStorage();
  loadAllTodos();
}

function deleteAllTodos() {
  allTodos = allTodos.filter((todo) => !todo.isCompleted);
  saveLocalStorage();
  loadAllTodos();
}
