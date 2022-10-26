let addBtn = document.querySelector("#addBtn");
let overlayForm = document.querySelector("#overlay-form");
let container = document.querySelector(".container");
let overlayInput = document.querySelector("#overlay-form-input");
let save = document.querySelector("#submit");
let invalid = document.querySelector("#invalid");
const todoList = document.querySelector(".tasks");
let cancel = document.querySelector(".clear");
let taskCount = 0;
let watermark = document.querySelector("#watermark");
let todos = [];

window.addEventListener("load", () => {
  const nameInput = document.querySelector("#name");
  const username = localStorage.getItem("username") || "";
  nameInput.value = username;
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    createTodo(todo);
  });
  checkWatermark();
});
const checkWatermark = () => {
  taskCount = todos.length;
  if (taskCount < 1) {
    todoList.innerHTML = `<div id="watermark" class="flex">
            <p>no tasks yet</p>
          </div>`;
  } else {
    console.log("no watermark");
  }
};

const createTodo = (todo) => {
  const list = document.createElement("li");
  list.setAttribute("id", todo.id);
  list.classList.add("list-item");
  list.innerHTML = `<p class="list-text">
        ${todo.name}</p>
      <button class="trash">
        <i class="fa-solid fa-trash fa-2xl"></i>
      </button>`;
  todoList.append(list);
};

const checkOverlay = () => {
  if (overlayForm.classList.contains("hide")) {
    overlayForm.classList.remove("hide");
    overlayForm.classList.add("flex");
    container.style.opacity = "20%";
    overlayInput.value = "";
  } else if (!overlayForm.classList.contains("hide")) {
    overlayForm.classList.add("hide");
    overlayForm.classList.remove("flex");
    container.style.opacity = "100%";
  }
};

addBtn.addEventListener("click", () => {
  checkOverlay();
  overlayInput.focus();
});

cancel.addEventListener("click", () => {
  checkOverlay();
  invalid.textContent = "";
});

const addTodo = (item) => {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      // completed: false,
    };
    checkWatermark();
    todos.push(todo);
    storeInLS(todos);
    overlayInput.value = "";
  } else {
    invalid.textContent = "No task added";
  }
};
save.addEventListener("click", () => {
  addTodo(overlayInput.value);
});
function showTodo(todos) {
  if (!overlayForm.classList.contains("hide")) {
    checkOverlay();
    todoList.innerHTML = "";
    invalid.textContent = "";
    todos.forEach((todo) => {
      createTodo(todo);
    });
    checkWatermark();
  }
}
function storeInLS(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo(todos);
  console.log(`showing todos form local`);
}

function deleteTodo(id) {
  todos = todos.filter((item) => item.id != id);
  checkWatermark();
  storeInLS(todos);
  console.log(todos);
  console.log(`removing todo`);
}
todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-trash")) {
    console.log("trashed");
    todoList.removeChild(event.target.parentElement.parentElement);
    deleteTodo(event.target.parentElement.parentElement.id);
  }
});
function onEnter() {
  if (!overlayForm.classList.contains("hide")) {
    addTodo(overlayInput.value);
    invalid.textContent = "";
  } else {
    overlayInputValue = "";
  }
}
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    checkOverlay();
    invalid.textContent = "";
    overlayInput.value = "";
    console.log("Cancelled addition");
  } else if (e.key === "Enter") {
    if (overlayInput.value === "") {
      invalid.textContent = "No task added";
    } else {
      onEnter();
    }
  }
});
