const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishedDate: [{
        date: {type:Number},
        month: {type:Number},
        year: {type:Number},
        publisher: {type:String}
    }],
    genre: [{type:String}],
    bookPrice:{
        type:Number,
        required:true
    },
    bookStock:{
        type:Number
    }
});

module.exports = mongoose.model('book', bookSchema);