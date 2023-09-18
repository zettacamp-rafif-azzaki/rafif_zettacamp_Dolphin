require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
// const { db } = require('./book.model');

const app = express();

let port = 3003;
mongoose.connect(`${process.env.DATABASE_URL}${process.env.DATABASE}`, {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected to database'))


app.use(express.json());
const bookRouter = require('./routes/purchaseBook.route')
app.use('/purchaseBook', bookRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });