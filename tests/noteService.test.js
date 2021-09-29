const NoteService = require("../NoteService/NoteService");
require("dotenv").config();

const knex = require("knex")({
    client: 'postgresql',
    connection: {
      database: "noteapptest",
      user:     "hayley",
      password: "password",
    }
});

describe("Testing function in note service", () => {
    beforeEach(() => {
        noteService = new NoteService(knex);
    })

    test("Should be able to add a note", async() => {
        await noteService.addNote("Hello", "Hayley")
            .then(() => noteService.listNote("Hayley")) 
            .then((notes) => {
                expect(notes).toEqual(
                    [{ id: 1, content: "Hello"}]
                );
            });
    });

    test("Should be able to list note", async() => {
        await noteService.listNote("Hayley")
            .then((notes) => expect(notes).toEqual(
                [{ id: 1, content: "Hello"}]
            ))
    })

    test("Should be able to edit note", async() => {
        await noteService.editNote("Hello Hayley", 1)
            .then(() => noteService.listNote("Hayley"))
            .then((notes) => {
                expect(notes).toEqual(
                    [{ id: 1, content: "Hello Hayley"}]
                )
            })
    })

    test("Should be able to remove a note", async() => {
        await noteService.deleteNote(1)
            .then(() => noteService.listNote("Hayley"))
            .then((notes) => {
                expect(notes).toEqual([])
            })
    })
})
