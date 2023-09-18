const express = require('express');

const app = express();
app.use(express.json());
let port = 3003;


app.post('/post',(req, res) => {
    
    // res.status(401).send(a);
  });





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });