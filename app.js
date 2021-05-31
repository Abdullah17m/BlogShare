//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = "Hello There! Here you Can share your day to blogs anonymously or by introducing yourself with everyone.This will be fun experince for everyone and everyone will get to know each other.Thank you Have fun";
const email = "abdullahmemon6702@gmail.com"
const contactContent = "This website was built by me.For contact click on links below.";

const app = express();
// const posts =[];
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

 mongoose.connect("mongodb+srv://abd:123@cluster0.9p1fj.mongodb.net/blogDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//  mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true,useUnifiedTopology : true});
const userSchema = ({
 
  title : String,
  name : String
  
})
const User =new mongoose.model("user",userSchema)


app.get("/",function(req,res){
  User.find(function(err,result){
    
     
        res.render("home.ejs",{homeContent : homeStartingContent,posts: result})
      
    })
})
app.post("/delete",function(req,res){
  
  User.findByIdAndRemove(req.body.button,function(err){
    if(err){
        console.log(err);
    }
    
    res.redirect("/")

})
})

 app.get("/posts/:pos",function(req,res){ 
  
   const urlTitle =  req.params.pos;
   User.findOne({_id : urlTitle},function(err,element){
    
      
        res.render("post.ejs",{ptitle:element.title,content:element.name})
        
      
      
    })
   
  

   }) 

app.get("/about",function(req,res){
  
    res.render("about.ejs");

  
})


app.get("/contact",function(req,res){
  
   res.render("contact.ejs",{conContent : contactContent, emailid:email});
 
    
  
  
})


app.get("/compose",function(req,res){
  
    res.render("compose.ejs");
  
    
  
  
  
})

app.post("/compose",function(req,res){
  
  const title = req.body.composeText;
  const name = req.body.composeBody;
 const item = new User({
   title : title,
   name : name
 })
 item.save(function(err){
   if(!err){
    res.redirect("/")

   }
 });
  

  

  

  

})




app.listen(process.env.PORT || 3000, function() {
  console.log("Server started ");
});
