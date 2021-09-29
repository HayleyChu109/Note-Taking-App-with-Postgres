class NoteService {
    constructor(knex) {
        this.knex = knex;
    }

    listNote(user) {
        return this.knex
            .select("notes.id", "notes.content")
            .from("notes")
            .innerJoin("users", "notes.user_id", "users.id")
            .where("users.username", user)
            .orderBy("notes.id")
            .then((notes) => {
                return notes.map((note) => ({ id: note.id, content: note.content }))
            });
    }

    addNote(note, user) {
        return this.knex("users")
            .select("id")
            .where("username", user)
            .then((id) => {
                return this.knex
                    .insert({ content: note, user_id: id[0].id })
                    .into("notes")
            });
    }

    editNote(note, index) {
        return this.knex("notes")
            .where("id", index)
            .update("content", note)
    };

    deleteNote(index) {
        return this.knex("notes")
            .where("id", index)
            .del()
    };
}

module.exports = NoteService;