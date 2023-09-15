require('dotenv').config()

const express = require('express');
const { OneHourPlaylist, GroupByArtist, GroupByGenre } = require('./song.js');
// const {  } = require('./song.js');
// const {  } = require('./song.js');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());
let port = 3003;


app.post('/GetOneHourPlaylist', AuthenticateToken,(req, res) => {
    OneHourPlaylist().then(
        function(value) {
        //   console.log(value);
          res.status(401).send(value);
        }
      );
  });

app.post('/GetByArtist', AuthenticateToken,(req, res) => {
    GroupByArtist().then(
        function(value) {
          console.log(value);
          res.status(401).send(value);
        }
      );
  });


app.post('/GetByGenre', AuthenticateToken,(req, res) => {
    GroupByGenre().then(
        function(value) {
          console.log(value);
          res.status(401).send(value);
        }
      );
  });


function AuthenticateToken(req, res, next){
    let authHeaders = req.headers['authorization']
    let token = authHeaders && authHeaders.split(' ')[1] //kalau authHeaders ada, ngga undefined. di split dan diambil index 1 krn: "bearer token"
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        console.log(token);
        console.log(process.env.ACCESS_SECRET_TOKEN);
        if(err) return res.sendStatus(403)
        req.user = user;
        next();
    });
}



app.post('/login', (req, res) => {
    const username = 'rafif';
    const user = { name:username };

    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {expiresIn: '1h'});
    res.json({ accessToken:accessToken })
  });

// ========================================================================
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });