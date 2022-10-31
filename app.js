//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//MONGO DB PART start


mongoose.connect("mongodb://localhost:27017/todolistdb");

const totoSchema=new mongoose.Schema({
  name: String
});

const item=mongoose.model("item",totoSchema);

const item1=new item({
  name: "AMIT"
})
const item2=new item({
  name: "akash"
})
const item3=new item({
  name: "Bithal"
})

const allItems=[item1,item2,item3];

const workItems = [];

app.get("/", function(req, res) {

  const day = date.getDate();
  item.find({},function(err,result){
    if(result.length===0){
      item.insertMany(allItems,function(err){
        if(err){
          console.log(err);
        }
        else
        {
          console.log("Data saved sucessfuly");
        }
      });
      res.redirect("/")
    }
    else{
      res.render("list", {listTitle: day, newListItems: result});
    }
  })
});

app.post("/", function(req, res){

  const itemName= req.body.newItem;
  const item4=new item({
    name: itemName
  })
  item4.save(); 
  res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkedItemId="asdf";
  console.log(checkedItemId);
  item.deleteOne({name: checkedItemId},function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("sucess");
    }
  })
  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
