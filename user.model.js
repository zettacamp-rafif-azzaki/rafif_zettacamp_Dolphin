const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    completeAddress:{
        type:String,
        required:true,

    },

    hobbiesSchema: [hobbiesSchema]
});

const hobbiesSchema = new mongoose.Schema({
    hobbyName:{
        type:String
    },
    hobbyTime:{
        type:String
    },
});

module.exports = mongoose.model('profile', profileSchema);