const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes, removeNote } = require("./notes.controller");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// const server = http.createServer(async (req, res) => {
//   if (req.method === "GET") {
//     const content = await fs.readFile(path.join(basePath, "index.html"));
//     // res.setHeader("content-type", "text/html");
//     res.writeHead(200, {
//       "Content-type": "text/html",
//     });
//     res.end(content);
//   } else if (req.method === "POST") {
//     const body = [];
//     res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
//     req.on("data", (data) => {
//       body.push(Buffer.from(data));
//     });
//     req.on("end", () => {
//       const title = body.toString().split("=")[1].replaceAll("+", " ");
//       addNote(title);
//       res.end(`title = ${title}`);
//     });
//   }
// });

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`server has been started on port ${port}`));
});
