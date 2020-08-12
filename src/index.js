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
  { id: 4, owner: 4, text: "Dust out the living room" },
  { id: 5, owner: 1, text: "Clean the house" }
];

const selectedIndex = 5;

var ulElement = document.getElementById("todoList");
var todoOwnersSelectElement = document.getElementById("todoOwners");
var addTop = document.getElementById("addToTop");
var addBottom = document.getElementById("addToBottom");
var titleElement = document.getElementById("todoOwnerName");
var newTaskTextbox = document.getElementById("newTask");
var liElements;

const setSelectedOwnerName = function () {
  titleElement.textContent =
    todoOwnersSelectElement.options[todoOwnersSelectElement.selectedIndex].text;
};

const populateTaskOwners = function () {
  people.forEach((person, index) => {
    var option = document.createElement("option");
    option.value = person.id;
    option.text = person.name;
    if (index === selectedIndex) {
      option.selected = true;
    }
    todoOwnersSelectElement.appendChild(option);
  });
  setSelectedOwnerName();
};

const populateTask = function () {
  //get selected option, and filter tasks
  var ownerId =
    todoOwnersSelectElement.options[todoOwnersSelectElement.selectedIndex]
      .value;
  var tasksOfOwner = tasks.filter((task) => task.owner === Number(ownerId));

  tasksOfOwner.map((task) => {
    var listElement = document.createElement("li");
    listElement.textContent = task.text;
    listElement.setAttribute("taskId", task.id);
    return ulElement.appendChild(listElement);
  });
  liElements = document.getElementsByTagName("li");
};

const addNewTask = function (place) {
  var newTaskText = newTaskTextbox.value;
  var newTaskId = ++tasks[tasks.length - 1].id;

  //create object
  var newTask = {};
  newTask.id = newTaskId;
  newTask.text = newTaskText;
  newTask.owner = Number(todoOwnersSelectElement.value);

  //create dom element (burası problemli)
  var listElement = document.createElement("li");
  listElement.textContent = newTaskText;
  listElement.setAttribute("taskId", newTaskId);

  if (listElement.textContent.length !== 0) {
    if (place === "top") {
      //add to array
      tasks.unshift(newTask);

      //add to dom
      ulElement.insertBefore(listElement, ulElement.childNodes[0]);
    } else if (place === "bottom") {
      //add to array
      tasks.push(newTask);

      //add to dom
      ulElement.appendChild(listElement);
    }
  }
};

const remove = function () {
  //from array
  /* is there any way
  var taskDeleted = tasks.find((task) => {
    return task.id === Number(this.getAttribute("taskId"));
  });
  console.log(taskDeleted)
  console.log(tasks.splice(taskDeleted.id, 1))
  console.log(tasks)
  */
  //from dom
  this.remove();
};
//make all tasks removable
const makeTasksRemovable = function () {
  [...liElements].forEach((liElement) => {
    liElement.addEventListener("click", remove, false);
  });
  /*
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener("click", remove, false);
  }
  */
};

//make single task removable (new added tasks)
const makeATaskRemovable = function (addedTask) {
  addedTask.addEventListener("click", remove, false);
};

//handling dynamic title
todoOwnersSelectElement.addEventListener("change", (e) => {
  setSelectedOwnerName();
});

//handling dynamic tasks
todoOwnersSelectElement.addEventListener("change", (e) => {
  //remove tasks
  ulElement.innerHTML = "";
  populateTask();
  makeTasksRemovable();
});

addTop.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTask("top");
  makeATaskRemovable(ulElement.firstChild);
});

addBottom.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTask("bottom");
  makeATaskRemovable(ulElement.lastChild);
});

populateTaskOwners();
populateTask();
makeTasksRemovable();
