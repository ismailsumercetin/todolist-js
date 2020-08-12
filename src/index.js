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

const selectedIndex = 1;

var ulElement = document.getElementById("todoList");
var todoOwnersSelectElement = document.getElementById("todoOwners");
var addTop = document.getElementById("addToTop");
var addBottom = document.getElementById("addToBottom");
var titleElement = document.getElementById("todoOwnerName");
var newTaskTextbox = document.getElementById("newTask");

const setSelectedOwnerName = function () {
  console.log();
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
    return ulElement.appendChild(listElement);
  });
};

const addNewTask = function (place) {
  var newTaskText = newTaskTextbox.value;

  //create object
  var newTask = {};
  newTask.id = ++tasks[tasks.length - 1].id;
  newTask.owner = Number(todoOwnersSelectElement.value);
  newTask.text = newTaskText;

  //create dom element
  var listElement = document.createElement("li");
  listElement.textContent = newTaskText;

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

//handling dynamic title
todoOwnersSelectElement.addEventListener("change", (e) => {
  setSelectedOwnerName();
});

//handling dynamic tasks
todoOwnersSelectElement.addEventListener("change", (e) => {
  //remove tasks
  ulElement.innerHTML = "";
  populateTask();
});

addTop.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTask("top");
});

addBottom.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTask("bottom");
});

populateTaskOwners();
populateTask();
