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

function populateTaskOwners() {
  people.map((person) => {
    var option = document.createElement("option");
    option.value = person.id;
    option.text = person.name;
    return document.getElementById("todoOwners").appendChild(option);
  });
}

function makeAnOwnerSelectedById(ownerId) {
  var ownerListElement = document.getElementById("todoOwners");
  ownerListElement.value = ownerId;
}

function displaySelectedNameAtFirst(ownerId) {
  var titleElement = document.getElementById("todoOwnerName");
  titleElement.innerHTML = people.find((person) => person.id === ownerId).name;
}

//handling dynamic title
document.getElementById("todoOwners").onchange = function (e) {
  document.getElementById("todoOwnerName").innerHTML = this.options[
    this.selectedIndex
  ].text;
};

//handling dynamic tasks
document.getElementById("todoOwners").onchange = function (e) {
  //get selected option, and filter tasks
  var ownerId = this.options[this.selectedIndex].value;
  var tasksOfOwner = tasks.filter((task) => task.owner === parseInt(ownerId));

  //remove all tasks on DOM
  var ulElement = document.getElementById("todoList");
  while (ulElement.firstChild) ulElement.removeChild(ulElement.firstChild);

  tasksOfOwner.map((task) => {
    var listElement = document.createElement("li");
    listElement.innerHTML = task.text;
    return ulElement.appendChild(listElement);
  });
};

populateTaskOwners();
makeAnOwnerSelectedById(SELECTED_ID);
displaySelectedNameAtFirst(SELECTED_ID);

/*
   1 Please write a function to init the app:
    - Populate 'TODO Owners" select element with people info
    - Make the second owner selected (Julia)
    - Display selected owner's name at the title
    - Show selected owner's task in the list
   
    3 Make "To Top" and "To Bottom" works, without touching the markup
    4 Implement a mechanism to make tasks can be completable and deletable
*/
