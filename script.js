// document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("myFunction");
let titleInput = document.getElementById("note-title");
let bodyInput = document.getElementById("note-body");
const addNote = document.getElementById("addBtn");
const con = document.querySelector(".con");

// let emptyDiv = document.getElementById("node-container");

// const addBtn = document.getElementById("addBtn");
addNote?.addEventListener("click", function (e) {
  e.preventDefault();

  // Parse any JSON previously stored in allEntries
  var existingEntries = JSON.parse(localStorage.getItem("notes"));
  if (existingEntries == null) existingEntries = [];

  if (titleInput.value === "" || bodyInput.value === "") {
    return 0;
  }
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const id = Math.round(Math.random() * 1000);

  const note = {
    id: id,
    title: title,
    body: body,
  };
  // localStorage.setItem("note", JSON.stringify(note));

  // Save allEntries back to local storage
  existingEntries.push(note);
  localStorage.setItem("notes", JSON.stringify(existingEntries));
  window.location.href = `index.html`;

  // for (let i = 0; i < notes.length; i++) {
  //   console.log(notes[i]);
  // }
  titleInput.value = "";
  bodyInput.value = "";

  // document.getElementById("myFunction").innerHTML =
  //   note.id + ", " + note.title + ", " + note.body;

  // console.log(notes);
});
// });
// node.innerHTML= notes.title;

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("notes-list");
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (container) {
    if (notes.length === 0) {
      container.innerHTML = `<p class="no-notes">No notes found.</p>`;
      return;
    }
    notes.forEach((note) => {
      const noteDiv = document.createElement("div");
      const an = document.createElement("a");
      an.className = "anchor";
      noteDiv.className = "note";
      noteDiv.innerHTML = `
      <p>${note.id}</p>
        <h3>${note.title}</h3>
        <p>${note.body}</p>
      `;
      an.appendChild(noteDiv);
      container.appendChild(an);

    });
  }
  con?.addEventListener("click", function (e) {
    e.preventDefault();
    document.write("Hellow Dear");
    // console.log("Hellow Dear");

  });
});
