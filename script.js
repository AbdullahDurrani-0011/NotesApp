
const form = document.getElementById("myFunction");
let titleInput = document.getElementById("note-title");
let bodyInput = document.getElementById("note-body");
const addNote = document.getElementById("addBtn");
const con = document.querySelector(".con");


addNote?.addEventListener("click", function (e) {
  e.preventDefault();

 
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
  existingEntries.push(note);
  localStorage.setItem("notes", JSON.stringify(existingEntries));
  window.location.href = `index.html`;
  titleInput.value = "";
  bodyInput.value = "";

});


const handleNoteClick = (note) => {
  // console.log(note, "note---");
  // return;
  window.location.href =  `Create.html?id=${note.id}`;
 
};


window.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const noteId = params.get("id");

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
      noteDiv.addEventListener("click", () => handleNoteClick(note));
      container.appendChild(an);
    });
  }

  // localStorage.setItem("notes-list", "This is my data");

  // const note = { id: "id", title: "title", body: "body" };
  // localStorage.setItem("note", JSON.stringify(notes - list));

 if(noteId && titleInput && bodyInput){
    const showNotes = notes.find((note)=> note.id == noteId);
    if(showNotes){
      titleInput.value = showNotes.title;
      bodyInput.value= showNotes.body;
    }
  }
});
 