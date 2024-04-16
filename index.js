// ! Do more Thinsg with this
// * Improve styling
// * add DB and also create a server
// * Host this on chrome if possible

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("add-task")
    .addEventListener("click", addTaskFromInput);
  loadTasks();
  Progress();
});

function Progress() {
  let totalTasks = document.getElementById("task-list").childNodes.length;
  const div = document.getElementById("progress");
  const span = document.createElement("p");
  span.classList.add("total-tasks");
  span.textContent = totalTasks;
  const oldSpan = div.querySelector(".total-tasks");
  if (oldSpan) {
    div.replaceChild(span, oldSpan);
  } else {
    // If no span element exists, append the new one
    div.appendChild(span);
  }
}

function addTaskFromInput() {
  const taskValue = document.getElementById("new-task").value;
  if (taskValue) {
    addTask(taskValue);
    Progress();
    document.getElementById("new-task").value = "";
    saveTasks();
  }
}

function addTask(taskValue, isCompleted = false) {
  const ul = document.getElementById("task-list");
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = isCompleted;
  checkbox.addEventListener("change", toggleTask);

  const text = document.createElement("span");
  text.textContent = taskValue;
  text.style.textDecoration = isCompleted ? "line-through" : "none";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", editTask);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", deleteTask);

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  ul.appendChild(li);

  ul.scrollTop = ul.scrollHeight;

  // * to implement a flash on new thing added
  // li.classList.add("highlight");
  // setTimeout(() => {
  //   li.classList.remove("highlight");
  // }, 10000);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(function (taskLi) {
    const text = taskLi.querySelector("span").textContent;
    const isCompleted = taskLi.querySelector("input").checked;
    tasks.push({ text, isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (task) {
    addTask(task.text, task.isCompleted);
  });
}

function toggleTask(event) {
  const text = event.target.nextElementSibling;
  text.style.textDecoration = event.target.checked ? "line-through" : "none";
  saveTasks();
}

function deleteTask(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  saveTasks();
  Progress();
}

function editTask(event) {
  const textSpan = event.target.previousElementSibling;
  const newText = prompt("Edit Your Task", textSpan.textContent);
  if (newText !== null) {
    textSpan.textContent = newText;
    saveTasks();
  }
}

// * Key press traversal implementation
// You need to use the tabindex property to make the li focusable and the keydown handler to handle events. The code below should give a rought idea. To keep track of which element you are on, you can use the tabIndex or e.target.value or a data-attribute.
// <ul>
//   <li tabindex="0" onkeydown="moveFocus(event)">A</li>
//   <li tabindex="1" onkeydown="moveFocus(event)">B</li>
//   <li tabindex="2" onkeydown="moveFocus(event)">C</li>
//   <li tabindex="3" onkeydown="moveFocus(event)">D</li>
// </ul>
// <script>
//   const tabbableItems = Array.from(document.querySelectorAll("ul>li"))
// function moveFocus(e){
//   let currentIndex = e.currentTarget.getAttribute("tabIndex")
//   if(e.key === "ArrowDown"){
//         currentIndex++
//   } else if (e.key === "ArrowUp"){
//         currentIndex--
//   }
//    const toFocus = tabbableItems.find(el =>
//        el.getAttribute("tabIndex") == currentIndex
//    )
//    if(toFocus){
//      toFocus.focus()
//    }
// }
// </script>
