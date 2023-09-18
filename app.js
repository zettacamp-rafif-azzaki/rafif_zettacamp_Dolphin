const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
let port = 3003;


app.post('/post', connect(),(req, res) => {
    
    // res.status(401).send(a);
  });

async function connect(){
    const url = 'mongodb://0.0.0.0:27017/';
    const database = 'zettacamp_BookPurchase';

    mongoose.connect(`${url}${database}`,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => {
        console.log('connected to MongoDB');
    }).catch((error) => {
        console.log('Error connecting to MongoDB: ', error);
    });
}



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });