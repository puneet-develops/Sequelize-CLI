const express = require("express");
var bodyParser = require("body-parser");
const app = express();
// require('./models');
app.use(bodyParser.json());
const { User, Contact } = require("./models");


app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/contacts/:id", async (req, res) => {
  const find = await Contact.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: find });
});
//add user
app.post("/adduser", async (req, res) => {
  var postdata = req.body;
  console.log(postdata)
  if(postdata.length>1){
    var data=await User.bulkCreate(postdata);
  }else{
    var data = await User.create(postdata); // this is first step now get the values from request
  }
  res.status(200).json({ data: data });
});
//addcontact
app.post('/addcontact',async (req, res) => {
  
    var postdata = req.body;
    if(postdata.length>1){
        var data=await Contact.bulkCreate(postdata);
      }else{
        var data = await Contact.create(postdata); // this is first step now get the values from request
      } // this is first step now get the values from request
      res.status(200).json({ data: data });
    });
//get users list
app.get('/users',async (req, res) => {
    const find = await User.findAll({});
    res.status(200).json({ data: find });
  });
//get perticular user with id
  app.get ('/users/:id',async (req, res) => {
    const find = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: find });
  });
// get all contacts list
  app.get('/contacts',async (req, res) => {
  const find = await Contact.findAll({});
  res.status(200).json({ data: find });
});
//get perticular contact with id
  app.get ('/contacts/:id',async (req, res) => {
    const find = await Contact.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: find });
  });
  // delete perticular user from the db 
  app.delete ('/users/:id',async (req, res) => {
    const find = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: find });
  });
  //delete perticular contact id 
  app.delete ('/contacts/:id',async (req, res) => {
    const find = await Contact.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: find });
  });
  //update user with the id
  app.patch ('/users/:id', async (req, res) => {
    var updatedbody=req.body;
    const find = await User.update(updatedbody,{
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: find });
  });
  //update contact with id 
  app.patch ('/contacts/:id',async (req, res) => {
    var updatedbody=req.body;
    const find = await Contact.update(updatedbody,{
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: find });
  });




  
app.listen(3000, () => {
    console.log("app will run on 3000");
  });