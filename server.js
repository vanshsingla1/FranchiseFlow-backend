var express=require("express");
// var fileuploader=require("express-fileupload");
var mongoose=require("mongoose");
var cors=require("cors");
var path=require("path");
var {url} = require("./config/config");

var app=express();

app.use(cors());
app.use(express.json()); 
app.listen(2004,function(){
    console.log("Server Started...");
})

app.use(express.urlencoded({ extended: true }));
// app.use(fileuploader());

var url = url;

mongoose.connect(url).then(()=>{
    console.log("DataBase is Connected ");
}).catch((err)=>{
    console.log(err.message);
})

var userRouter=require("./routers/userRouter");
var adminRouter = require("./routers/adminRouter");
app.use("/user",userRouter);
app.use("/admin",adminRouter);