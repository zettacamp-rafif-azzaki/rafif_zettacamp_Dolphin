const express = require('express');
const { Purchase_Book } = require('./payment_book.js');

const app = express();
app.use(express.json());
let port = 3003;



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


  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

