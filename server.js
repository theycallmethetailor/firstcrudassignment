const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
//{ "name":"user name", "email": "user email", "state": "CA" }
app.use(bodyParser.json());
//route for creating new users
app.post('/users', (req, res) => {
  let newUser = req.body
  if(!newUser) {
    res.sendStatus(400)
  }
  storage.push(req.body)
  console.log(storage);
  res.json(req.body.name)
})

//route for getting all users
app.get('/users', (req, res) => {
    res.json(storage)
})

//get route for getting a user by name
app.get('/users/:name', (req, res) => {
  let username = req.params.name
  if(!username && storage.indexOF(username) === -1) {
    res.sendStatus(404)
  } else {
    console.log("your req for userinfo worked");
    res.json(storage[storage.indexOf(username)])
  }
})

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
