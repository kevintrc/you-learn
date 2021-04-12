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

// router.get("/tasks", auth, async (req, res) => {
//    const match = {};
//    const sort = {};

//    if (req.query.completed) {
//       match.completed = req.query.completed === "true";
//    }

//    if (req.query.sort) {
//       const parts = req.query.sort.split(":");
//       sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
//    }

//    try {
//       await req.user
//          .populate({
//             path: "tasks",
//             match,
//             options: {
//                limit: parseInt(req.query.limit),
//                skip: parseInt(req.query.skip),
//                sort
//             }
//          })
//          .execPopulate();
//       res.send(req.user.tasks);
//    } catch (e) {
//       res.status(500).send(e);
//    }
// });

// router.get("/tasks/:id", auth, async (req, res) => {
//    const _id = req.params.id;
//    try {
//       const task = await Task.findOne({ _id, owner: req.user._id });
//       if (!task) return res.status(404).send();
//       res.send(task);
//    } catch (e) {
//       res.status(500).send(e);
//    }
// });

// router.patch("/tasks/:id", auth, async (req, res) => {
//    const properties = ["completed", "description"];
//    const givenParams = Object.keys(req.body);
//    const availableProperty = givenParams.every((param) => properties.includes(param));
//    if (!availableProperty) {
//       return res.status(400).send({ error: "INVALID UPDATION" });
//    }

//    try {
//       const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
//       if (!task) {
//          return res.status(404).send();
//       }
//       givenParams.forEach((param) => (task[param] = req.body[param]));
//       await task.save();
//       res.status(200).send(task);
//    } catch (e) {
//       res.status(400).send(e);
//    }
// });

// router.delete("/tasks/:id", auth, async (req, res) => {
//    try {
//       const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
//       if (!task) return res.status(404).send();
//       res.send(task);
//    } catch (e) {
//       res.status(500).send(e);
//    }
// });

module.exports = router;
