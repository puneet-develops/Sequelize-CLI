const express = require("express");
const bodyParser = require("body-parser");
const multer=require("multer");
const app = express();
// require('./models');
app.use(bodyParser.json());
const { User, Contact,File } = require("./models");

const storage=multer.diskStorage({
  destination:(req,file, cb)=>{ 
    cb(null,"uploads");
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
});
const upload=multer({storage});
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
// validator
app.post('/validate',async(req,res)=>{
  const data = await User.create({ 
    firstName: "Jane",
    lastName:"kumar"
   });
   res.status(200).json({ data: data });

});
// for uploading an image 
app.post("/upload",upload.single("file"),async(req,res)=>{
  const{originalname ,path}=req.file;
  await File.create({filename:originalname,path})
  .then(()=>{
    res.send("File uploaded successfully");
  })
  .catch(er=>{
    res.status(500).send("Error uplaoding file");
  });
});
// route for fetching the file 
app.get("/file/:id",(req,res)=>{
  const fileId=req.params.id;
  File.findByPk(fileId)
  .then(file =>{
    if(!file){
      return res.status(404).send("file not found");
    }
    res.download(file.path);
  })
  .catch(e=>{
    res.status(500).send("error fetching the file");
  });
});
// listening 
app.listen(3000, () => {
    console.log("app will run on 2333");
});