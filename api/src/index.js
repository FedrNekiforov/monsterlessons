const express = require("express");
const { port, host } = require("./configuration");
const { connectDb } = require("./helpers/db");
const mongoose = require('mongoose')
const app = express();

let userChema = new mongoose.Schema({
  name: String
});
let UserModel = mongoose.model('User', userChema);

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host is ${host}`);

    UserModel.find((err, posts)=> {
      console.log('before saved!', posts);
    });

    let user = new UserModel({name: 'Proton'});
    user.save((err, savedUser) => {
      if(err) console.log(err);

      UserModel.find((err, posts)=> {
        console.log('after saved!!!', posts);
      });
    }); 

  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
