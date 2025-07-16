const form = document.getElementById("myFunction");
let titleInput = document.getElementById("note-title");
let bodyInput = document.getElementById("note-body");
const actionBtn = document.getElementById("addOrUpdateBtn");
const removeBtn = document.getElementById("removeBtn");

const params = new URLSearchParams(window.location.search);
const noteId = params.get("id");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

if (noteId && titleInput && bodyInput) {
  const existingNote = notes.find((note) => note.id == noteId);
  if (existingNote) {
    titleInput.value = existingNote.title;
    bodyInput.value = existingNote.body;
    actionBtn.textContent = "Update Note";
    actionBtn.className = "update-btn";
    removeBtn.style.display = "flex";
    removeBtn.className = "remove-btn";
  }
}

actionBtn?.addEventListener("click", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  if (!title || !body) return;

  if (noteId) {
    notes = notes.map((note) =>
      note.id == noteId ? { ...note, title, body } : note
    );
  } else {
    const newNote = {
      id: Math.round(Math.random() * 100000),
      title,
      body,
    };
    notes.push(newNote);
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.href = "index.html";
});

removeBtn?.addEventListener("click", () => {
  if (!noteId) return;
  notes = notes.filter((note) => note.id != noteId);
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.href = "index.html";
});

const handleNoteClick = (note) => {
  window.location.href = `Create.html?id=${note.id}`;
};

const container = document.getElementById("notes-list");
if (container) {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  container.innerHTML = "";

  if (storedNotes.length === 0) {
    container.innerHTML = `<p class="no-notes">No notes found.</p>`;
  } else {
    storedNotes.forEach((note) => {
      const noteDiv = document.createElement("div");
      const an = document.createElement("a");
      an.className = "anchor";
      noteDiv.className = "note";

      noteDiv.innerHTML = `
        <p>ID: ${note.id}</p>
        <h3>${note.title}</h3>
        <p>${note.body}</p>
      `;

      noteDiv.addEventListener("click", () => handleNoteClick(note));
      an.appendChild(noteDiv);
      container.appendChild(an);
    });
  }
}
