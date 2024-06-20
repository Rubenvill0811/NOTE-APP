const router = require('express').Router();
const DB = require('../db/database')


router.post('/notes', async (req, res) => {
    try {
        const postNote = await DB.createNote(req.body)
        return res.json(postNote);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await DB.deleteNote(req.params.id);
        return res.json(deletedNote);
    } catch(err) {
        return res.status(500).json(err)
    }
});

router.get('/notes', async (req, res)=>{
    try {
        const notes = await DB.storedNotes();
        return res.json(notes);
    } catch (err) {
        return res.status(500).json(err)
    }
});


module.exports = router;