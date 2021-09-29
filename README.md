# Note Taking App (with Postgres)

- A website that can input, update and delete your notes

## Installation

#### Running javascript files:

- Download whole files in your desktop
- Open the file by VS code or similiar software
- Open the terminal in VS code
- Run the following commands

```
npm install
```

#### Set up knex

- Create your own .env file and input your database name, username and password of postgres

```
DB_NAME="Your database name"
DB_USERNAME="Your username"
DB_PASSWORD="Your password"
```

- After created it, go to seeds and then 01_users.js and add your username and password in it
- Run the following commands

```
knex migrate:latest
knex seed:run
```

- Run nodemon app.js in the terminal

## How it works

### Log in

- Login the website by inputting the id and password

### Input note

- Input your note in the textarea and then press button of "Add note"
- Then your note will be shown on the right hand side

### Edit note

- Update your note if you want then click anywhere outside of the textarea
- The new note will be saved automatically

### Delete note

- If you want to remove a note, you can click on the delete button
- Then the note will be removed
