const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },

  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "print all notes",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "remove note",
  async handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();
