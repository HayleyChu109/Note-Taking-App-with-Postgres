const express = require("express");

class NoteRouter {
    constructor(noteService) {
        this.noteService = noteService;
    }

    router() {
        let router = express.Router();

        router.get("/", this.get.bind(this));
        router.post("/", this.post.bind(this));
        router.put("/:index", this.put.bind(this));
        router.delete("/:index", this.delete.bind(this));

        return router;
    }

    get(req, res) {
        console.log("Get");
        return this.noteService
            .listNote(req.auth.user)
            .then((notes) => {
                res.json(notes)
            })
            .catch((err) => {
                res.status(500).json(err)
            });
    }

    post(req, res) {
        console.log("Post");
        return this.noteService
            .addNote(req.body.inputNote, req.auth.user)
            .then(() => this.noteService.listNote(req.auth.user))
            .then((notes) => {
                res.json(notes);
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    put(req, res) {
        console.log("Put")
        return this.noteService
            .editNote(req.body.inputNote, req.params.index)
            .then(() => this.noteService.listNote(req.auth.user))
            .then((notes) => {
                res.json(notes)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    delete(req, res) {
        console.log("Delete")
        return this.noteService
            .deleteNote(req.params.index)
            .then(() => this.noteService.listNote(req.auth.user))
            .then((notes) => {
                res.json(notes)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

module.exports = NoteRouter;