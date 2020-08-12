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
    return ulElement.appendChild(listElement);
  });
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
  var listElement = document.createElement("li");
  listElement.textContent = document.getElementById("newTask").value;

  if (listElement.textContent.length !== 0)
    ulElement.insertBefore(listElement, ulElement.childNodes[0]);
});

addBottom.addEventListener("click", (e) => {
  e.preventDefault();

  var listElement = document.createElement("li");
  listElement.textContent = document.getElementById("newTask").value;

  if (listElement.textContent.length !== 0) ulElement.appendChild(listElement);
});

populateTaskOwners();
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
