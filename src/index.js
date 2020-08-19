import "./styles.css";
const people = [
  { id: 1, name: "Guillermo" },
  { id: 3, name: "Julia" },
  { id: 2, name: "Sam" },
  { id: 4, name: "Alex" }
];

const tasks = [
  { id: 1, owner: 1, text: "Take out the trash" },
  { id: 2, owner: 2, text: "Walk the dog" },
  { id: 3, owner: 3, text: "Wash the dishes" },
  { id: 4, owner: 4, text: "Dust out the living room" }
];

const selectedIndex = 1;

//DOM elements
const ulElement = document.querySelector("#todoList");
const todoOwnersSelectElement = document.querySelector("#todoOwners");
const addTop = document.querySelector("#addToTop");
const addBottom = document.querySelector("#addToBottom");
const titleElement = document.querySelector("#todoOwnerName");
const newTaskTextbox = document.querySelector("#newTask");

//constant strings
const OWNER = "owner";
const TASKS = "tasks";
const BOTTOM = "bottom";
const TOP = "top";
const TASK_ID = "taskId";

let liElements;
/*---------------------------------------------------------------*/

//render title
const setSelectedOwnerName = () => {
  titleElement.textContent =
    todoOwnersSelectElement.options[todoOwnersSelectElement.selectedIndex].text;
};

const populateTaskOwners = () => {
  const ownerData = JSON.parse(sessionStorage.getItem("owner"));

  ownerData.forEach((person, index) => {
    const option = document.createElement("option");
    option.value = person.id;
    option.text = person.name;
    if (index === selectedIndex) {
      //set selected owner
      option.selected = true;
    }
    //append owners
    todoOwnersSelectElement.appendChild(option);
  });

  //render title
  setSelectedOwnerName();
};

const populateTask = () => {
  //clear task lisk
  ulElement.innerHTML = "";

  //get selected option, and filter tasks
  const ownerId =
    todoOwnersSelectElement.options[todoOwnersSelectElement.selectedIndex]
      .value;
  //get owner data form sessionStorage
  const taskData = JSON.parse(sessionStorage.getItem(TASKS));
  //filter tasks by owner id
  const tasksOfOwner = taskData.filter(
    (task) => task.owner === Number(ownerId)
  );

  //create list elements and render tasks to DOM
  tasksOfOwner.forEach((task) => {
    const listElement = document.createElement("li");
    listElement.textContent = task.text;
    listElement.setAttribute(TASK_ID, task.id);
    ulElement.appendChild(listElement);
  });
  //get li elements for removal
  liElements = document.querySelectorAll("li");
  //HTMLCollection to array
  [...liElements].forEach((liElement) => {
    liElement.addEventListener("click", remove);
  });
};

const addNewTask = (place) => {
  const newTaskText = newTaskTextbox.value;

  //if task input is empty, return null
  if (!newTaskText) return null;

  //get tasks from sessionStorage
  const storedTasks = JSON.parse(sessionStorage.getItem(TASKS));

  let maxTaskId = 0;

  if (storedTasks.length !== 0)
    maxTaskId = Math.max(...storedTasks.map((task) => task.id));

  const newTaskId = ++maxTaskId;

  //create object
  const newTask = {};
  newTask.id = newTaskId;
  newTask.owner = Number(todoOwnersSelectElement.value);
  newTask.text = newTaskText;

  if (place === TOP) {
    //add to the beginning of the array
    storedTasks.unshift(newTask);
  } else if (place === BOTTOM) {
    //add to the end of the array
    storedTasks.push(newTask);
  }

  //update tasks item in sessionStorage
  sessionStorage.setItem(TASKS, JSON.stringify(storedTasks));
};

const remove = function () {
  const taskData = JSON.parse(sessionStorage.getItem(TASKS));
  //find task index and delete
  const taskDeleted = taskData.findIndex((task) => {
    return task.id === Number(this.getAttribute(TASK_ID));
  });

  taskData.splice(taskDeleted, 1);

  sessionStorage.setItem(TASKS, JSON.stringify(taskData));
  //render tasks and make them removable
  populateTask();
};

todoOwnersSelectElement.addEventListener("change", () => {
  //render title
  setSelectedOwnerName();
  //clear task list, render tasks and make all tasks removable
  populateTask();
});

addTop.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTask(TOP);
  populateTask();
});

addBottom.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTask(BOTTOM);
  populateTask();
});

checkSessionStorage();
populateTaskOwners();
populateTask();

function checkSessionStorage() {
  let ownerStorage;
  let tasksStorage;
  try {
    ownerStorage = JSON.parse(sessionStorage.getItem(OWNER));
    tasksStorage = JSON.parse(sessionStorage.getItem(TASKS));
  } catch (error) {
    //if storage data is distorted, inform the user
    alert("Storage data not existing or distorted! Reloading default data...");
  } finally {
    //check if not existing or distorted. In both ways, fill the storage
    if (!ownerStorage) sessionStorage.setItem(OWNER, JSON.stringify(people));
    if (!tasksStorage) sessionStorage.setItem(TASKS, JSON.stringify(tasks));
  }
}
