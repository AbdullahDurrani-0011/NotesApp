const form = document.getElementById("myFunction");
let titleInput = document.getElementById("note-title");
let bodyInput = document.getElementById("note-body");
const addNote = document.getElementById("addBtn");

// let emptyDiv = document.getElementById("node-container");

let notes = [];

// const addBtn = document.getElementById("addBtn");
addNote.addEventListener("click", function (e) {
  e.preventDefault();
  // const title = document.getElementById("note-title").value;
  // const body = document.getElementById("note-body").value;

  if (titleInput.value === "" || bodyInput.value === "") {
    return 0;
  }

  const id = Math.round(Math.random() * 1000);

  const note = {
    id: id,
    title: title,
    body: body,
  };

  notes.push(note);

  for (let i = 0; i < notes.length; i++) {
    console.log(notes[i]);
  }
  titleInput.value = "";
  bodyInput.value = "";

  // document.getElementById("myFunction").innerHTML =
  //   note.id + ", " + note.title + ", " + note.body;

  // console.log(notes);
});

// node.innerHTML= notes.title;
