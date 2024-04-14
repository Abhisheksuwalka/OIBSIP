"use strict";

const addTaskBtn = document.querySelector("#addTask");

const newTaskInput = document.querySelector("#takeInput input");
const newTaskDiscription = document.querySelector("#takeInput textarea");
const error = document.querySelector("#error");
const taskContainer = document.querySelector("#taskList");
const countValue = document.querySelector(".task-count");
const mainTaskList = document.querySelector("#mainTaskList");

var taskCount = 0;

const displayCount = (taskCount) => {
  // console.log(taskCount);
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  const taskDiscription = newTaskDiscription.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 11);
    return;
  }

  const taskItem = `<li>
  <div class="task">
    <input type="checkbox" class="task-check" />
    <span class="taskname">${taskName}</span>
    <span class="discription">${taskDiscription}</span>
    <button
      class="edit-task"
      style="background: transparent; border: none"
    >
      <i class="fa-regular fa-pen-to-square fa-2x"></i>
    </button>
    <button
      class="delete"
      style="background: transparent; border: none"
    >
      <i class="fa-regular fa-trash-can fa-2x"></i>
    </button>
  </div>
</li>`;

  mainTaskList.insertAdjacentHTML("beforeend", taskItem);
  taskCount += 1;
  displayCount(taskCount);

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      const thisDivCheckBox = button.parentNode.querySelector(".task-check");
      if (!thisDivCheckBox.checked) {
        taskCount -= 1;
      }
      button.parentNode.parentNode.remove();
      displayCount(taskCount);
    };
  });

  const editButtons = document.querySelectorAll(".edit-task");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }
      newTaskInput.value =
        targetElement.previousElementSibling?.previousElementSibling?.innerText;
      newTaskDiscription.value = targetElement.previousElementSibling.innerText;
      targetElement.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const taskCheck = document.querySelectorAll(".task-check");
  taskCheck.forEach((checkBox) => {
    checkBox.onchange = (e) => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        e.target.parentNode.style.background = "var(--done-tile-bg)";
        taskCount -= 1;
      } else {
        e.target.parentNode.style.background = "var(--tile-bg)";
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });
  newTaskInput.value = "";
  newTaskDiscription.value = "";
};

addTaskBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
  // newTaskDiscription.value = "";
};
