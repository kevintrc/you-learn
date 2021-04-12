const express = require("express");
const Note = require("../models/notes");
const auth = require("../middleware/auth");
const searchYt = require("../apis/ytApi")

const router = new express.Router();

router.get("/public", async (req, res) => {
    Note.find({ public: true }).then(
        (notes) => res.send(notes)
    ).catch((e) => console.log(e))
})

router.get("/usernotes", auth, async (req, res) => {
    try
    {
        await req.user
            .populate({
                path: "notes",
            })
            .execPopulate();
        res.send(req.user.notes);
    } catch (e)
    {
        res.status(400).send(e);
    }
})


router.get("/search", async (req, res) => {
    try
    {
        searchYt(req.query.term, req.query.nextPageToken, req.query.prevPageToken, (error, { data, prevPageToken, nextPageToken } = {}) => {
            if (error) return res.status(400).send({ error: error.message })
            res.send({ data, prevPageToken, nextPageToken });
        })
    } catch (e)
    {
        res.status(400).send({ error: e.message })
    }
})

router.post("/notes", auth, async (req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.user._id
    });
    try
    {
        await note.save();
        res.send(note);
    } catch (e)
    {
        res.status(400).send(e);
    }
});


module.exports = router;
