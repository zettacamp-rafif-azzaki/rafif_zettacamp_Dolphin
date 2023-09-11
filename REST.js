const express = require('express');
const { Purchase_Book } = require('./payment_book.js');
const { CalculateTerm } = require('./payment_book.js');
const { log } = require('console');
const { resolve } = require('path');

const app = express();
app.use(express.json());
let port = 3003;


//Authentication
app.use((req, res, next) => {

    // -----------------------------------------------------------------------
    // authentication middleware
  
    const auth = {login: 'admin', password: 'password'} 
  
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  
    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
      // Access granted...
      return next()
    }
  
    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') 
    res.status(401).send('Authentication required.') 
  
    // -----------------------------------------------------------------------
  
  })


app.post('/post',(req, res) => {
    let bname = req.body['bname'];
    let discount = req.body['discount'];
    let tax = req.body['tax'];
    let stock = req.body['stock'];
    let purchase = req.body['purchase'];
    let creditDuration = req.body['creditDuration'];


    var a = Purchase_Book(bname, discount, tax, stock, purchase, creditDuration);
    
    console.log(a);
    res.status(401).send(a);
  });

  app.post('/calculateTerm', (req,res)=>{
    let finalPrice = req.body['fPrice'];
    let termDuration = req.body['termDuration'];
    // let result = calculateInputTerm(finalPrice, termDuration);

    CalculateTerm(termDuration, finalPrice).then(
      function(value) {
        console.log(value);
        res.status(401).send(value);
      }
    );
  });

  app.post('/addingTerm', (req,res)=>{
    let finalPrice = req.body['fPrice'];
    let termDuration = req.body['termDuration'];
    let TermToAdd = req.body['TermToAdd'];
    let amountToAdd = req.body['amountToAdd'];

    AddToTerm(termDuration, finalPrice, TermToAdd, amountToAdd).then(
      function(value) {
        // console.log(value);
        res.status(401).send(value);
      }
    );
  });

  async function AddToTerm(termDuration, finalPrice, TermToAdd, amountToAdd){
    var termArray = await CalculateTerm(termDuration, finalPrice);

    try {
      // termArray - 1 is for starting from 1 not from index 0
      //adding amountToAdd to a particular month's dueCredit and saving the previous value to "changes"
      termArray[TermToAdd-1].changes = {"dueCredit":termArray[TermToAdd-1].dueCredit}
      termArray[TermToAdd-1].dueCredit = termArray[TermToAdd-1].dueCredit + amountToAdd;
      console.log(termArray[TermToAdd-1].dueCredit);
    } catch (error) {
      console.log("check if TermToAdd is less than termDuration")
    }
    console.log(termArray);
    
    return termArray;
  }

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

