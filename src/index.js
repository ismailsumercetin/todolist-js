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

/*
   1 Please write a function to init the app:
    - Populate 'TODO Owners" select element with people info
    - Make the second owner selected (Julia)
    - Display selected owner's name at the title
    - Show selected owner's task in the list
   
    3 Make "To Top" and "To Bottom" works, without touching the markup
    4 Implement a mechanism to make tasks can be completable and deletable
*/
