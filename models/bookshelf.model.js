const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema({
    bookid: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}],
    bookshelfName:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('bookshelf', bookshelfSchema);