const { error } = require('console');
const fs = require('fs');
const util = require('util');
const { v1: uniqueId} = require('uuid')

const createFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);

class DB {
    post(note) {
        return createFilePromise('db/db.json', JSON.stringify(note));
    }
    
    get() {
        return readFilePromise('db/db.json', 'utf8');
    }

    async storedNotes() {
        try {
            const notes = await this.get();
            return JSON.parse(notes) || [];
        } catch (err) {
            return [];
        }
    }

    async createNote(note) {
        const { title, content } = note;
        if (!title || !content) {
            throw new Error('The title or text fields cannot be empty.');
        }

        const newNote = { title, content, id: uniqueId() };
        try {
            const notes = await this.storedNotes();
            const noteBook = [...notes, newNote];
            await this.post(noteBook); 
            return newNote;
        } catch (err) {
            throw new Error('There was an error posting this note.');
        }
    }

    async deleteNote(id) {
        try {
            const notes = await this.storedNotes();
            const filteredNotes = notes.filter((note) => note.id !== id);
            await this.post(filteredNotes);
        } catch (err) {
            console.error(`Error deleting note: ${err}`);
            throw new Error('There was an error deleting this note.');
        }
    }
}

module.exports =  new DB;