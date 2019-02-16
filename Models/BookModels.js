let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bookModel = new Schema({
    title:{type : String},
    author:{type : String},
    genre:{type : String},
    read:{type: Boolean,default:false},
    bookId : {type : Number}
});

module.exports = mongoose.model('books',bookModel);