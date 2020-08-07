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

const SELECTED_ID = 3;

var ulElement = document.getElementById("todoList");
var todoOwners = document.getElementById("todoOwners");
var addTop = document.getElementById("addToTop");
var addBottom = document.getElementById("addToBottom");
var titleElement = document.getElementById("todoOwnerName");

function populateTaskOwners() {
  people.map((person) => {
    var option = document.createElement("option");
    option.value = person.id;
    option.text = person.name;
    return todoOwners.appendChild(option);
  });
}

function makeAnOwnerSelectedById(ownerId) {
  todoOwners.value = ownerId;
}

function displaySelectedNameAtFirst(ownerId) {
  titleElement.innerHTML = people.find((person) => person.id === ownerId).name;
}

function populateTask() {
  //get selected option, and filter tasks
  var ownerId = todoOwners.options[todoOwners.selectedIndex].value;
  var tasksOfOwner = tasks.filter((task) => task.owner === parseInt(ownerId));

  tasksOfOwner.map((task) => {
    var listElement = document.createElement("li");
    listElement.innerHTML = task.text;
    return ulElement.appendChild(listElement);
  });
}

//handling dynamic title
todoOwners.onchange = function () {
  titleElement.innerHTML = this.options[this.selectedIndex].text;
};

//handling dynamic tasks
todoOwners.onchange = function () {
  //remove tasks
  while (ulElement.firstChild) ulElement.removeChild(ulElement.firstChild);

  populateTask();
};

addTop.onclick = function (e) {
  e.preventDefault();
  var listElement = document.createElement("li");
  listElement.innerHTML = document.getElementById("newTask").value;
  //var textnode = document.createTextNode("Water");
  //ulElement.appendChild(textnode);
  if (listElement.innerHTML.length !== 0)
    ulElement.insertBefore(listElement, ulElement.childNodes[0]);
};

addBottom.onclick = function (e) {
  e.preventDefault();
  var listElement = document.createElement("li");
  listElement.innerHTML = document.getElementById("newTask").value;

  if (listElement.innerHTML.length !== 0) ulElement.appendChild(listElement);
};

populateTaskOwners();
makeAnOwnerSelectedById(SELECTED_ID);
displaySelectedNameAtFirst(SELECTED_ID);
populateTask();

/*
   1 Please write a function to init the app:
    - Populate 'TODO Owners" select element with people info
    - Make the second owner selected (Julia)
    - Display selected owner's name at the title
    - Show selected owner's task in the list
   
    3 Make "To Top" and "To Bottom" works, without touching the markup
    4 Implement a mechanism to make tasks can be completable and deletable
*/
