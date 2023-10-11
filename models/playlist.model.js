const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    songid: [{type: mongoose.Schema.Types.ObjectId, ref: 'song'}],
    playlistName:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('playlist', playlistSchema);