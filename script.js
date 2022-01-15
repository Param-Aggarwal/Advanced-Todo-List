const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST";// to differentiate it from other site' key value pairs
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
let todos = loadTodos();
todos.forEach(todo => renderTodo(todo));


list.addEventListener("change", e => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;

  const parent = e.target.closest(".list-item"); // HTML parent
  const todoId = parent.dataset.todoId; // Correspondong id for parent
  const clickedTodo = todos.find(e => e.id === todoId); // todo which we checked
  clickedTodo.complete = e.target.checked;
  saveTodos();
})

list.addEventListener("click", e => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item"); // HTML parent
  const todoId = parent.dataset.todoId; // Correspondong id for parent
  parent.remove(); // remove todo from screen
  todos = todos.filter(e => e.id !== todoId) // to remove todo from todos list, we keep only those todos whose value is not equal to matched todo
  saveTodos();
})


// Add todos
form.addEventListener("submit", e => {
  e.preventDefault();

  const todoName = todoInput.value;
  if (todoName === "") return;
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString()// valueOf func returns the milliseconds
  };
  todos.push(newTodo);
  renderTodo(newTodo);
  saveTodos();
  todoInput.value = "";
})

function renderTodo(newTodo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = newTodo.id;
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = newTodo.name;
  const todoCheckbox = templateClone.querySelector("[data-list-item-checkbox]");
  todoCheckbox.checked = newTodo.complete;
  list.appendChild(templateClone);
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || []; // to convert string into js object and return nothing if empty array
}
