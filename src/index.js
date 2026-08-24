//import dotenv from "dotenv";
// 1. Always run configuration first
//dotenv.config(...): Initializes the library and instructs it to read a file from your hard drive, parse its key-value secrets, and inject them into Node's runtime environment (process.env).
//path: './env': This instructs the library to search for a file literally named env (with no dot prefix) in your current directory, rather than looking for a standard hidden .env file

//By default, when you just run dotenv.config(), the library searches your root project folder for a file named exactly .env.
//However, passing an options object with a path property allows you to change that default behavior.
//dotenv.config({
  //path: './.env'
//})


// 2. Import everything else AFTER configuration
//B) To write into separate file and import
import connectDB from './db/index.js';
//if export is default then any name can be given else if {export} then {import}

/* to import your configured app from app.js instead of creating a new one
import express from "express";
const app=express();//creates the Express application
*/

import app from "./app.js";   //  Import your configured app 


// 3. Connect to the database
//when async function is completed a promise is returned
connectDB()

//Only is retuned promise by mongodb.connect() is reolved the .then executes.
//thus connect db first if successful then start express app
.then(()=>{
  //app.listen() starts the Express server to make it listen for incoming HTTP requests
  app.listen(process.env.PORT || 3000, ()=>{

    console.log(`Listening on Port ${process.env.PORT}`);
  });

  //The listener called when the error event fires. It receives the parent(here error) app as its only argument: callback(parent)
  app.on("error",(error)=>{
    console.log("ERROR",error);
  })
})
.catch((error)=>{
  console.log("MONGODb CONNECTION FAILED!!",error);
})



/*
import mongoose from "mongoose";
import {DB_NAME} from "./constant";
import express from "express";
const app= express();

//IFEE
(async ()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error",()=>{
      console.log(error);
      throw error;
    })

    app.listen(process.env.PORT,()=>{
      console.log(`App is listenig on port ${process.env.PORT}`);
    });
  } catch(error){
    console.error("ERROR",error);
    throw error
  }
})()
*/
