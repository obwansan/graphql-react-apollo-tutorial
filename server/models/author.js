const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Don't need to add id because mongodb adds one to each file (document?) added to the database
const authorSchema = new Schema({
    name: String,
    age: Number,
});

// model corresponds to collection in mongodb
// Creates an 'Author' model (and corresponding 'authors' collection in mongodb) that contains author records that must correspond to the authorSchema.
// Use the Author model in the code to interact with the authors collection in mongodb.
module.exports = mongoose.model('Author', authorSchema)