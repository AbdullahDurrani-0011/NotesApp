const notes = [];
let myFuntion = document
  .getElementById("myFunction")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let noteTitle = document.getElementById("note-title").value;

    let noteBody = document.getElementById("note-body").value;

    notes.push({ title: noteTitle, body: noteBody });
    localStorage.setItem("notes", JSON.stringify(notes));
  });

console.log(document.getElementById("myFunction"));

// let getNotes = () => {
//   // get notes from local storage
//   const storedNotes = localStorage.getItem("notes");
//   console.log(storedNotes);
//   const outputContainer = document.getElementById("output");

//   outputContainer.innerHTML = storedNotes;
// };

document.getElementsById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("clicked");
});
