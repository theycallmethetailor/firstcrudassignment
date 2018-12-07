const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [{ "name":"username1", "email": "user email", "state": "CA" }, { "name":"username2", "email": "user email", "state": "CA" }, { "name":"username3", "email": "user email", "state": "CA" }];
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
  for (var i = 0; i < storage.length; i++) {
    if(storage[i].name === username) {
      res.json(storage[i])
    }
  }
})

//update route for updating user y name
app.put('/users/:name', (req, res) => {
  let username = req.params.name
  let newInfo = req.body
  for (var i = 0; i < storage.length; i++) {
    if(storage[i].name === username) {
      storage[i] = newInfo
      res.send("updated user unfo successfully")
    }
  }
  res.sendStatus(400)
})

//delete route for deleting a user by name
app.delete('/users/:name', (req, res) => {
  let username = req.params.name
  console.log(typeof username);
  for (var i = 0; i < storage.length; i++) {
    if(storage[i].name === username) {
      storage.splice(i, 1)
      res.send('account deleted successfully. congrats loser')
    }
  }
  res.sendStatus(404)
  // let index = storage.indexOF(username)
  // if(!username && index === -1) {
  //   res.sendStatus(404)
  // } else {
  //   storage.splice(index, 1)
  //   res.send('account deleted successfully. congrats loser')
  // }
})

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
