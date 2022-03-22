const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("note was Added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes"));
  notes.forEach((note) => {
    console.log(chalk.blue(`${note.id} ${note.title}`));
  });
}
async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote(id) {
  const notes = await getNotes();
  const removedArr = notes.filter((note) => note.id !== id);
  await saveNotes(removedArr);
  console.log(chalk.bgRed("Note removed!"));
}

async function editNote(titleId, data) {
  const notes = await getNotes();
  notes.filter((note) => {
    if (note.id === titleId) {
      return (newNote = {
        title: data.data,
        id: titleId,
      });
    }
  });
  const updatedNotesList = notes.map((note) => {
    return note.id === newNote.id ? newNote : note;
  });
  await saveNotes(updatedNotesList);
  console.log(chalk.yellow("Note updated!"));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
};
