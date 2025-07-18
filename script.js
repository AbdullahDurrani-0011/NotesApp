const form = document.getElementById("myFunction");
let titleInput = document.getElementById("note-title");
let bodyInput = document.getElementById("note-body");
const addNote = document.getElementById("addBtn");
const con = document.querySelector(".con");
const removebtn = document.getElementById("remove-it");
const updatebtn = document.getElementById("update-it");

let notes = [];



function convertTime() {
  // code here
}

addNote?.addEventListener("click", function (e) {
  e.preventDefault();

  let existingEntries = JSON.parse(localStorage.getItem("notes"));
  if (existingEntries == null) existingEntries = [];

  if (titleInput.value === "" || bodyInput.value === "") {
    return 0;
  }
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const id = Math.round(Math.random() * 1000);

  createdAt: Date.now();
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
  //
  // return;
  window.location.href = `Create.html?id=${note.id}`;
};

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const noteId = params.get("id");

  // if (noteId) {
  //   addBtn.classList.add("hidden");
  //   updatebtn.classList.remove("hidden");
  //   removebtn.classList.remove("hidden");
  // } else {
  //   addBtn.classList.remove("hidden");
  //   updatebtn.classList.add("show");
  //   removebtn.classList.add("show");
  // }

  const container = document.getElementById("notes-list");
  notes = JSON.parse(localStorage.getItem("notes")) || [];

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
        <p class="note-date">${note.currentDate || ""}</p>
      `;
      an.appendChild(noteDiv);
      noteDiv.addEventListener("click", () => handleNoteClick(note));
      container.appendChild(an);
    });
  }

  if (noteId && titleInput && bodyInput) {
    const showNotes = notes.find((note) => note.id == noteId);
    if (showNotes) {
      titleInput.value = showNotes.title;
      bodyInput.value = showNotes.body;
    }
  }

  removebtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get("id");
    const Notes = notes.filter((note) => note.id != noteId);
    localStorage.setItem("notes", JSON.stringify(Notes));
    window.location.href = "index.html";
  });

  updatebtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get("id");

    const updatedNotes = notes.map((note) => {
      if (note.id == noteId) {
        note.title = titleInput.value.trim();
        note.body = bodyInput.value.trim();
        return note;
      }
      return note;
    });

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    window.location.href = "/";
  });
});
