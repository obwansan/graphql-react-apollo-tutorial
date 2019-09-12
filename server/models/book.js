const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Don't need to add id because mongodb adds one to each file (document?) added to the database
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
});

// model corresponds to collection in mongodb
// creates a 'Books' model (collection in db) that contains books that must correspond to the bookSchema.
// use the book model in the code to interact with the book collection in mongodb
module.exports = mongoose.model('Book', bookSchema)