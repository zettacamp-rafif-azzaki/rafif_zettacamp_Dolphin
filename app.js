const mongoose = require('mongoose');

const url = 'mongodb://0.0.0.0:27017/';
const database = 'zettacamp_profile';

mongoose.connect(`${url}${database}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log('connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB: ', error);
});