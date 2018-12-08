const fs =require('fs')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const storage = require('./storage.json')
// let counter = 2;
// Use the array below to store the users. Add/remove/update items in it based off
// let storage = [];
//{ "id":0, "name":"user name", "email": "user email", "state": "CA" }
app.use(bodyParser.json());
//route for creating new users
app.post('/users', (req, res) => {
  let newUser = req.body
  if(!newUser) {
    res.sendStatus(400)
  }
  let newUniqueId = storage[storage.length-1].id + 1
  req.body.id = newUniqueId
  storage.push(req.body)
  counter++
  fs.writeFileSync('./storage.json', JSON.stringify(storage))
  res.json(req.body.name)
})

//route for getting all users
app.get('/users', (req, res) => {
    res.json(storage)
})

//get route for getting a user by id
app.get('/users/:id', (req, res) => {
  let userid = req.params.id
  for (var i = 0; i < storage.length; i++) {
    if(storage[i].id === parseInt(userid)) {
      res.json(storage[i])
    }
  }
  res.sendStatus(404)
})

//update route for updating user y name
app.put('/users/:id', (req, res) => {
  let userid = req.params.id
  req.body.id = parseInt(userid)
  let newInfo = req.body
  for (var i = 0; i < storage.length; i++) {
    if(storage[i].id === parseInt(userid)) {
      storage[i] = newInfo
      fs.writeFileSync('./storage.json', JSON.stringify(storage))
      res.send("updated user info successfully")
    }
  }
  res.sendStatus(400)
})

//delete route for deleting a user by name
app.delete('/users/:id', (req, res) => {

  // for (var i = 0; i < storage.length; i++) {
  //   console.log(storage[i].id === parseInt(userid));
  //   if(storage[i].id === parseInt(userid)) {
  //     storage.splice(i, 1)
  //     res.send('account deleted successfully. congrats')
  //     res.end()
  //   }
  // }
  // res.sendStatus(404)
  // let index = storage.indexOF(username)
  // if(!username && index === -1) {
  //   res.sendStatus(404)
  // } else {
  //   storage.splice(index, 1)
  //   res.send('account deleted successfully. congrats loser')
  // }
  let userid = parseInt(req.params.id)
  let indexOfTheUserThatWeAreGoingToDeleteFromTheDatabase = storage.findIndex((user)=> user.id == userid)
  if(indexOfTheUserThatWeAreGoingToDeleteFromTheDatabase === -1) {
    res.sendStatus(404)
  } else {
    storage.splice(indexOfTheUserThatWeAreGoingToDeleteFromTheDatabase, 1)
    console.log(storage);
    fs.writeFileSync('./storage.json', JSON.stringify(storage))
    res.send('account deleted successfully. congrats')
  }
})

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
