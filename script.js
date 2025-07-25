const form = document.getElementById("myFunction");
let titleInput = document.getElementById("note-title");
let bodyInput = document.getElementById("note-body");
const addNote = document.getElementById("addBtn");
const removebtn = document.getElementById("remove-it");
const updatebtn = document.getElementById("update-it");

let notes = [];

function convertTime(creationTime) {
  const cdate = new Date(creationTime);
  const currentTime = new Date();
  const diffMs = currentTime - cdate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffSec / 3600);
  const diffDay = Math.floor(diffSec / 86400);
  let result;

  if (diffSec < 5) return "just now";
  else if (diffSec < 60) return `${diffSec} seconds ago`;
  else if (diffMin === 1) return "1 minute ago";
  else if (diffMin < 60) return `${diffMin} minutes ago`;
  else if (diffHour === 1) return "1 hour ago";
  else if (diffHour < 24) return `${diffHour} hours ago`;
  else if (diffDay === 1) return "1 day ago";
  else return `${diffDay} days ago`;
}

addNote?.addEventListener("click", function (e) {
  e.preventDefault();

  let existingEntries = JSON.parse(localStorage.getItem("notes")) || [];

  if (titleInput.value === "" || bodyInput.value === "") return;

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const id = Math.round(Math.random() * 1000);

  const note = {
    id,
    title,
    body,
    creationTime: Date.now(),
    LastEdited: Date.now(),
  };

  existingEntries.push(note);
  localStorage.setItem("notes", JSON.stringify(existingEntries));
  window.location.href = `index.html`;
});

const handleNoteClick = (note) => {
  window.location.href = `Create.html?id=${note.id}`;
};

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const noteId = params.get("id");
  const container = document.getElementById("notes-list");
  const lastEditDiv = document.getElementById("last-edit-time");
  notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (noteId) {
    addNote?.classList.add("hidden");
    updatebtn?.classList.remove("hidden");
    removebtn?.classList.remove("hidden");

    const showNotes = notes.find((note) => note.id == noteId);
    if (showNotes) {
      titleInput.value = showNotes.title;
      bodyInput.value = showNotes.body;

      if (lastEditDiv) {
        lastEditDiv.textContent = `Last Edit : ${convertTime(showNotes.creationTime)}`;
      }
    }
  } else {
    addNote?.classList.remove("hidden");
    updatebtn?.classList.add("hidden");
    removebtn?.classList.add("hidden");
  }

  updatebtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const noteId = new URLSearchParams(window.location.search).get("id");

    const updatedNotes = notes.map((note) => {
      if (note.id == noteId) {
        note.title = titleInput.value.trim();
        note.body = bodyInput.value.trim();
        note.LastEdited = Date.now();
        
      }
      return note;
    });

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    window.location.href = "index.html";
  });

 

  removebtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const noteId = new URLSearchParams(window.location.search).get("id");
    const filteredNotes = notes.filter((note) => note.id != noteId);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    window.location.href = "index.html";
  });

  const filterInput = document.getElementById("Note-Filter");
  const sortSelect = document.getElementById("sort-notes");

  function renderNotes(notesToRender) {
    if (!container) return;
    container.innerHTML = "";

    if (!notesToRender.length) {
      container.innerHTML = `<p class="no-notes">No notes found.</p>`;
      return;
    }

    notesToRender.forEach((note) => {
      const noteDiv = document.createElement("div");
      const an = document.createElement("a");
      an.className = "anchor";
      noteDiv.className = "note";
      noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p class="note-date">Last Edit : ${convertTime(note.LastEdited)}</p>
      `;
      an.appendChild(noteDiv);
      noteDiv.addEventListener("click", () => handleNoteClick(note));
      container.appendChild(an);
    });
  }

  function filterAndSortNotes() {
    const filterValue = filterInput.value.toLowerCase().trim();
    const sortValue = sortSelect.value;

    let filteredNotes = notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(filterValue) ||
        note.body.toLowerCase().includes(filterValue)
      );
    });

    if (sortValue === "last-edited") {
      filteredNotes.sort((a, b) => b.LastEdited - a.LastEdited);
    } else if (sortValue === "alphabetically") {
      filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "recently-created") {
      // filteredNotes.sort((a, b) => a.creationTime - b.LastEdited);
      filteredNotes.sort((a, b) => b.creationTime - a.creationTime);
    }

    renderNotes(filteredNotes);
  }

  filterInput?.addEventListener("input", filterAndSortNotes);
  sortSelect?.addEventListener("change", filterAndSortNotes);

  if (container) {
    renderNotes(notes);
  }
});
