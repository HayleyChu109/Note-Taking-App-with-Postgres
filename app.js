// Node packages
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

// Set up knex
require("dotenv").config();
const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);

// Set up public folder and middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main.handlebars" }));
app.set("view engine", "handlebars");

// Set up basic authorization
const basicAuth = require("express-basic-auth");
const authChallenger = require("./userAuth/authChallenger");
app.use(basicAuth({
    authorizer: authChallenger,
    challenge: true,
    authorizeAsync: true,
}))

// Set up note service and router
const NoteService = require("./NoteService/NoteService");
const NoteRouter = require("./NoteRouter/NoteRouter");
const noteService = new NoteService(knex);
const noteRouter = new NoteRouter(noteService);

// Index page
app.get("/", (req, res) => {
    noteService.listNote(req.auth.user).then((notesFromService) => {
      res.render("home", {
        user: req.auth.user,
        notes: notesFromService,
      });
    });
});

// Router
app.use("/api/notes", noteRouter.router());


app.listen(8080, () => {
    console.log("Application listening to port 8080");
});

module.exports = app;