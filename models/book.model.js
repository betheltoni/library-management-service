import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    isBorrowed: {
        type: Boolean,
        default: false
    }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;