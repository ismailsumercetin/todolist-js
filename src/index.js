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
const ulElement = document.getElementById("todoList");
const todoOwnersSelectElement = document.getElementById("todoOwners");
const addTop = document.getElementById("addToTop");
const addBottom = document.getElementById("addToBottom");
const titleElement = document.getElementById("todoOwnerName");
const newTaskTextbox = document.getElementById("newTask");
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
  const taskData = JSON.parse(sessionStorage.getItem("tasks"));
  //filter tasks by owner id
  const tasksOfOwner = taskData.filter(
    (task) => task.owner === Number(ownerId)
  );

  //create list elements and render tasks to DOM
  tasksOfOwner.forEach((task) => {
    const listElement = document.createElement("li");
    listElement.textContent = task.text;
    listElement.setAttribute("taskId", task.id);
    ulElement.appendChild(listElement);
  });
  //get li elements for removal
  liElements = document.getElementsByTagName("li");
};

const addNewTask = (place) => {
  const newTaskText = newTaskTextbox.value;

  //if task input is empty, return null
  if (!newTaskText) return null;

  //get tasks from sessionStorage
  const storedTasks = JSON.parse(sessionStorage.getItem("tasks"));

  let maxTaskId = 0;

  if (storedTasks.length !== 0)
    maxTaskId = Math.max(...storedTasks.map((task) => task.id));

  const newTaskId = ++maxTaskId;

  //create object
  const newTask = {};
  newTask.id = newTaskId;
  newTask.owner = Number(todoOwnersSelectElement.value);
  newTask.text = newTaskText;

  if (place === "top") {
    //add to the beginning of the array
    storedTasks.unshift(newTask);
  } else if (place === "bottom") {
    //add to the end of the array
    storedTasks.push(newTask);
  }

  //update tasks item in sessionStorage
  sessionStorage.setItem("tasks", JSON.stringify(storedTasks));
};

const remove = function () {
  const taskData = JSON.parse(sessionStorage.getItem("tasks"));
  //find task index and delete
  const taskDeleted = taskData.findIndex((task) => {
    return task.id === Number(this.getAttribute("taskId"));
  });

  taskData.splice(taskDeleted, 1);

  sessionStorage.setItem("tasks", JSON.stringify(taskData));
  //render tasks and make them removable
  render();
};

//make all tasks removable
const makeTasksRemovable = () => {
  //HTMLCollection to array
  [...liElements].forEach((liElement) => {
    liElement.addEventListener("click", remove);
  });
};

todoOwnersSelectElement.addEventListener("change", () => {
  //render title
  setSelectedOwnerName();
  //clear task list, render tasks and make all tasks removable
  render();
});

addTop.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTask("top");
  render();
});

addBottom.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTask("bottom");
  render();
});

checkSessionStorage();
populateTaskOwners();
render();

function checkSessionStorage() {
  let ownerStorage;
  let tasksStorage;
  try {
    ownerStorage = JSON.parse(sessionStorage.getItem("owner"));
    tasksStorage = JSON.parse(sessionStorage.getItem("tasks"));
  } catch (error) {
    //if storage data is distorted, inform the user
    alert("Storage data not existing or distorted! Reloading default data...");
  } finally {
    //check if not existing or distorted. In both ways, fill the storage
    if (!ownerStorage) sessionStorage.setItem("owner", JSON.stringify(people));
    if (!tasksStorage) sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function render() {
  populateTask();
  makeTasksRemovable();
}
