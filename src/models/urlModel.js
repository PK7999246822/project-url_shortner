//Importing mongoose package
const mongoose = require('mongoose');

//Instantiate a mongoose schema
const URLSchema = new mongoose.Schema({
    urlCode: {
        type: String
    }, 
    longUrl: {
        type: String
    }, 
    shortUrl: {
        type: String
    } 
}, { timestamps: true });

//creating a model from schema and export it 
module.exports = mongoose.model('Url', URLSchema) 

