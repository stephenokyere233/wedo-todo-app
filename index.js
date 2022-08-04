// localStorage
window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const username = localStorage.getItem("username") || "";
  nameInput.value = username;
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  overlayForm.addEventListener("submit", (e) => {
    const todo = {
      content: overlayInputValue,
      done: false,
    };
    todos.push(todo);
    (localStorage.setItem = "todos"), JSON.stringify("todos");
    e.target.reset();
  });
});
// end localStorage declaration
var keyInput = document.querySelector("#overlay-form-input");
var overlayForm = document.querySelector("#overlay-form");
document.addEventListener("keydown", function keypressed(e) {

  if(overlayForm.classList.contains('flex')){
     if (e.key == "Backspace") {
    keyInput.value = keyInput.value.slice(0,-1);
  } 
  else if (e.key == "Enter" ) {
    keyInput.value =keyInput.value;
  } 
  else if (e.key == "Alt" || e.key == "Shift"||e.key=='Çontrol') {
    keyInput.value=keyInput.value;
  } else {
    keyInput.value += e.key;
  }
  }else{
    keyInput.value="";
  }
 

  console.log(e);
});

// functional add button which shows overlay form onclick
var addBtn = document.querySelector("#addBtn");
var overlayForm = document.querySelector("#overlay-form");
var container = document.querySelector(".container");
var header = document.querySelector("header");
addBtn.addEventListener("click", () => {
  if (overlayForm.classList.contains("hide")) {
    overlayForm.classList.remove("hide");
    overlayForm.classList.add("flex");
    container.style.opacity = "20%";
    var overlayInputValue = document.querySelector("#overlay-form-input").value;
    overlayInputValue = "";
    console.log(overlayInputValue);
  }
});
// end

// cancel button which hides overlay form onclick
var cancel = document.querySelector(".clear");
const clr = () => {
  if (!overlayForm.classList.contains("hide")) {
    overlayForm.classList.add("hide");
    overlayForm.classList.remove("flex");
    container.style.opacity = "100%";
    invalid.textContent = "";
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
// var list = document.createElement("li");
var taskCount = 0;
var watermark = document.querySelector("#watermark");
const showWatermark = () => {
  if (watermark.classList.contains("flex") ) {
    watermark.classList.remove("flex");
    watermark.classList.add("hide");
  }
  // else if(taskCount)

};
const saveTodo = () => {
  var overlayInputValue = document.querySelector("#overlay-form-input").value;

  if (overlayInputValue == "") {
    invalid.textContent = "No task added";
  } else {
    if (!overlayForm.classList.contains("hide")) {
      overlayForm.classList.remove("flex");
      overlayForm.classList.add("hide");
      container.style.opacity = "100%";
    }
    var list = document.createElement("li");
    list.classList.add("list-item");
    list.textContent = overlayInputValue;
    taskCount++;
    var addlist=taskCount;
     console.log(`addlist is ${addlist}`);
  
    // console.log(taskCount);
      console.log(`the number of lists is ${taskCount}`);
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "trash";
    var binIcon = document.createElement("i");
    binIcon.classList.add("fa-solid", "fa-trash", "fa-2xl");
    deleteBtn.appendChild(binIcon);
    list.append(deleteBtn);

    ul.append(list);
    console.log(overlayInputValue);
    console.log(list);
    overlayInput.value = "";
    invalid.textContent = "";
    
    // var counter = 0;
    // counter=list++;
    // console.log(counter);
  }
};
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
    // console.log(1);

    if (confirm("Are you sure?")) {
      var target = e.target.parentElement.parentElement;
      task.removeChild(target);
      // console.log(target);
      taskCount--;
      var removelist=taskCount;
      console.log(`removelist is ${removelist}`);
      // console.log(taskCount);
      console.log(`the number of lists is ${taskCount}`);
      console.log(removelist);
    }
  }
}
ul.addEventListener("click", removeItem);

// keyfunctions
const togglePopUp = () => {
  // check if overlay is hidden
  if (overlayForm.classList.contains("flex")) {
    overlayForm.classList.add("hide");
    overlayForm.classList.remove('flex')}
  // } else {
  //   overlayForm.classList.add("hide");
  //   //  overlayForm.classList.remove("flex");
  // }
};
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    togglePopUp();
    invalid.textContent = "";
    keyInput.value="";

    container.style.opacity = "100%";
  } else if (e.key === "Enter") {
    onEnter();
    showWatermark();
    container.style.opacity = "100%";
  }
 
});

 