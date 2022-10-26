window.addEventListener("load", () => {
  const nameInput = document.querySelector("#name");
  const username = localStorage.getItem("username") || "";
  nameInput.value = username;
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });
});
// end localStorage declaration

// functional add button which shows overlay form onclick
var addBtn = document.querySelector("#addBtn");
var overlayForm = document.querySelector("#overlay-form");
var container = document.querySelector(".container");
var header = document.querySelector("header");
var keyInput = document.querySelector("#overlay-form-input");
let addlist;
let removelist;

addBtn.addEventListener("click", () => {
  if (overlayForm.classList.contains("hide")) {
    overlayForm.classList.remove("hide");
    overlayForm.classList.add("flex");
    container.style.opacity = "20%";
    var overlayInputValue = document.querySelector("#overlay-form-input").value;
    overlayInput.focus();
    console.log(`*Adding New task*`);
    overlayInput.value = "";
  }
});
// add button end

// const num = () => {};
// cancel button which hides overlay form onclick
var cancel = document.querySelector(".clear");
const clr = () => {
  if (!overlayForm.classList.contains("hide")) {
    overlayForm.classList.add("hide");
    overlayForm.classList.remove("flex");
    container.style.opacity = "100%";
    invalid.textContent = "";
    console.log("Cancelled addition");
  }
};
cancel.addEventListener("click", clr);
//  end cancel

// variable declarations
var overlayInput = document.querySelector("#overlay-form-input");
var save = document.querySelector("#submit");
var overlayForm = document.querySelector("#overlay-form");
var invalid = document.querySelector("#invalid");
var ul = document.querySelector(".tasks");
var taskCount = 0;
var watermark = document.querySelector("#watermark");

// #watermark to be shown
const showWatermark = () => {
  if (watermark.classList.contains("flex")) {
    watermark.classList.remove("flex");
    watermark.classList.add("hide");
  }
};
// end of watermark function

let todos = [];
const saveTodo = () => {
  var overlayInputValue = document.querySelector("#overlay-form-input").value;
  if (overlayInputValue == "") {
    invalid.textContent = "No task added";
    console.warn("Add a task to continue");
  } else {
    if (!overlayForm.classList.contains("hide")) {
      overlayForm.classList.remove("flex");
      overlayForm.classList.add("hide");
      container.style.opacity = "100%";
    }

    var list = document.createElement("li");
    list.classList.add("list-item");
    taskCount++;
    list.setAttribute('id',taskCount-1)
    addlist = taskCount;
    console.log(`You have ${addlist} lists now `);

    var listText = document.createElement("p");
    listText.setAttribute("id", "list-text");
    listText.textContent = overlayInputValue;
    list.appendChild(listText);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "trash";

    var binIcon = document.createElement("i");
    binIcon.classList.add("fa-solid", "fa-trash", "fa-2xl");
    binIcon.setAttribute("accesskey", "r");
    deleteBtn.appendChild(binIcon);
    list.append(deleteBtn);
    // for (let i = 0; i < todos.length; i++) {
    //   list.setAttribute("id", i);
    // }
    ul.append(list);

    if (taskCount >= 8) {
      ul.style.overflowY = "scroll";
      // console.log(`Will scroll now`);
    }

    invalid.textContent = "";

    var newTodo = {
      id: list.id,
      name: list.textContent,
    };
    // console.log(newData)
    todos = [...todos, newTodo];
    localStorage.setItem("todos", JSON.stringify(todos));

    console.log(todos);
    // if (localStorage.getItem("todos") == null) {
    //   localStorage.setItem("todos", "[]");
    // }
    // var oldData = JSON.parse(localStorage.getItem("todos"));
    // oldData.push(newData);
    // localStorage.setItem("todos", JSON.stringify(oldData));

    // for (let i = 0; i < addlist; i++) {
    //   const element = todos[i];
    //   var newVal = overlayInput.value;
    //   todos.push(newVal);
    //   console.log(todos);
    //   console.log(`listtextval is ${listText.textContent}`);
    // }
  }
};
// window.addEventListener("load", (e) => {
//   todos.forEach((element,index) => {
//     // (watermark.classList.contains("flex"))
//     if(localStorage.getItem("todos") == null){
//       watermark.classList.add("flex");
//       watermark.classList.remove("hide");
//     }
//     // else if(removeItem()){

//     // }
//     else{
//    watermark.classList.remove("flex");
//    watermark.classList.add("hide");
//       let list = document.createElement("li");
//       list.classList.add("list-item");
//       taskCount++;
//       var addlist = taskCount;
//       console.log(`You have ${addlist} lists now `);

//       let listText = document.createElement("p");
//       listText.setAttribute("id", "list-text");
//       listText.innerHTML = element;
//       console.log(`element is ${element}`);
//       list.appendChild(listText);

//       let deleteBtn = document.createElement("button");
//       deleteBtn.className = "trash";

//       let binIcon = document.createElement("i");
//       binIcon.classList.add("fa-solid", "fa-trash", "fa-2xl");
//       binIcon.setAttribute("accesskey", "r");
//       deleteBtn.appendChild(binIcon);
//       list.append(deleteBtn);
//       //  for (let i = 0; i < todos.length; i++) {
//       //    list.setAttribute("id", i);
//       //  }

//       ul.append(list);

//     }

//   });
// });

function onEnter() {
  if (!overlayForm.classList.contains("hide")) {
    saveTodo();
  } else {
    overlayInputValue = "";
  }
}
save.addEventListener("click", saveTodo);
save.addEventListener("click", showWatermark);

// removeItem from list
var task = document.querySelector(".tasks");
var li = document.querySelector(".list-item");
function removeItem(e) {
  if (e.target.classList.contains("fa-trash")) {
    console.warn("Do you really wanna remove item? Tell alert");

    if (confirm("Are you sure?")) {
      taskCount--;
      removelist = taskCount;
      todos.splice(e.target.parentElement.parentElement.id,1)
      localStorage.setItem("todos",JSON.stringify(todos))
      console.log(todos)
      var target = e.target.parentElement.parentElement;
      // todos.splice(removelist,1)
      // console.log(todos);
      // let filtered = todos.filter((element, index) => {
      //   return element.id !== e.target.parentElement.parentElement.id;
      // });
      task.removeChild(target);

      if (removelist < 1) {
        watermark.classList.remove("hide");
        watermark.classList.add("flex");
        console.log("No list item watermark will show now");
        //  for (let i = 0; i < addlist; i++) {
        //   // const element = array[i];
        //      todos.splice(i, 1);
        //      console.log(todos);

        //  }
      }
      console.log(`*Removing Lists*`);
      // console.log(todos);
      console.log(`You have ${taskCount} lists now`);
    }
  }
}
ul.addEventListener("click", removeItem);

// this will run when keys are pressed
const togglePopUp = () => {
  // check if overlay is hidden
  if (overlayForm.classList.contains("flex")) {
    overlayForm.classList.add("hide");
    overlayForm.classList.remove("flex");
  }
};
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    // togglePopUp checks if the overlayForm is hidden or not
    togglePopUp();
    // makes the paragraph content zero
    invalid.textContent = "";
    keyInput.value = "";
    container.style.opacity = "100%";
    console.log("Cancelled addition");
  } else if (e.key === "Enter") {
    onEnter();
    showWatermark();
    container.style.opacity = "100%";
  }
});
