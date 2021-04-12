const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    imgPath: {
        type: String,
        required: true,
        trim: true
    },
    note: {
        type: String,
        required: true,
        trim: true
    },
    videoId: {
        type: String,
        required: true,
        trim: true
    },
    public: {
        type: Boolean,
        default: false,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
