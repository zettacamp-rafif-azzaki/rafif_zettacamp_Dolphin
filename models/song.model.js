const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    genre: [{type:String}],
    duration:{
        type:Number,
        required:true
    },
    playlistID: {type: mongoose.Schema.Types.ObjectId, ref: 'playlist'}

});

module.exports = mongoose.model('song', songSchema);