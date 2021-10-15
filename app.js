const express = require("express");
const cors=require('cors');
const dotenv=require('dotenv').config();
const HttpError=require('./Model/HttpError');
const app = express();
const mongoose=require('mongoose');

//cors
app.use(cors());

// Instead of using body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//db connection
mongoose.connect(process.env.DB_URI)
const db=mongoose.connection;
db.on('open',()=>{
  console.log('database connected');
})

db.on('error',()=>{
  console.log('error while connecting database');
})

//api routes
const route=require('./Routes/userRoutes');
app.use("/api",route);

//handling wrong requests
app.use((req,res,next)=>{
  var error=new HttpError('not found',404);
  next(error);
})

//response with error message and code
app.use((error,req,res,next)=>{
  return res.status(error.code).json({message:error.message});
})

//port listing on 3000
app.listen(3000,()=>{
  console.log("listing")
});
