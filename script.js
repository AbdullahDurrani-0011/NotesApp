const form = document.getElementById("myFunction");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");
const addNote = document.getElementById("addBtn");

const node = document.getElementById("node-container");

addNote.addEventListener("click", function (e) {
  e.preventDefault();
  const title = document.getElementById("note-title").value;
  const body = document.getElementById("note-body").value;
  const id = Math.round(Math.random() * 1000);
  const notes = {
    id: id,
    title: title,
    body: body,
  };
  console.log(notes);
  // node.innerHTML= notes.title;
});

