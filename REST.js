const express = require('express');
const { Purchase_Book } = require('./payment_book.js');
const { CalculateTerm } = require('./payment_book.js');
// const { log } = require('console');
// const { resolve } = require('path');

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
  // ========================================================================
  // day 2

  app.post('/calculateTerm', (req,res)=>{
    let finalPrice = req.body['fPrice'];
    let termDuration = req.body['termDuration'];
    // let result = calculateInputTerm(finalPrice, termDuration);
    console.log(finalPrice);
    console.log(termDuration);

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
// ========================================================================
// Day_3

app.post('/loopNonAwait', (req,res)=>{
  looping().then(
    function(value) {
      console.log("A");
      res.status(401).send("Success");
    }
  );
});

app.post('/loopAwait', (req,res)=>{
  awaitLoopingFunction().then(
    function(value) {
      console.log("B");
      res.status(401).send("Success");
    }
  );
});

async function awaitLoopingFunction(){
  console.log("C");
  let value = await looping();
  console.log("D");
  return value;
}

async function looping(){
  let length = 5;
  let i=1;
  const promiseLoop = new Promise((resolve, reject) => {
    setTimeout(function doSomething() {
      resolve(console.log("i: " + i));
      if(i<length){
        setTimeout(doSomething, 2000);
        i++;
      }
    }, 2000);
  });
  return promiseLoop;
}

// ========================================================================
// Day_4


app.post('/SetAndMap', (req,res)=>{
  let finalPrice = req.body['fPrice'];
  let termDuration = req.body['termDuration'];
  // let TermToAdd = req.body['TermToAdd'];
  // let amountToAdd = req.body['amountToAdd'];

  SetAndMap(termDuration, finalPrice).then(
    function(value) {
      console.log(value);
      res.status(401).send(value);
    }
  );
});

async function SetAndMap(termDuration, finalPrice){
  var termArray = await CalculateTerm(termDuration, finalPrice);
  let returnObject = {}
  let setTerm = new Set();
  let mapTerm = new Map();

  termArray.forEach((value, i) => {
    setTerm.add(value);
    mapTerm.set(termArray[i].dueDate, {"dueDate": termArray[i].dueDate, "dueCredit": termArray[i].dueCredit, "pay": termArray[i].pay});
  });


  
  returnObject["term_using_set"] = Array.from(setTerm);
  returnObject["term_using_map"] = Object.fromEntries(mapTerm);
  
  returnObject["get_term"] = mapTerm.get('30 October 2023');
  
  return returnObject;
}




// ========================================================================
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

