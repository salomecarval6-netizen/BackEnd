import dotenv from "dotenv";

//B) To write into separate file and import
import connectDB from './db/index.js';


//dotenv.config(...): Initializes the library and instructs it to read a file from your hard drive, parse its key-value secrets, and inject them into Node's runtime environment (process.env).
//path: './env': This instructs the library to search for a file literally named env (with no dot prefix) in your current directory, rather than looking for a standard hidden .env file

//By default, when you just run dotenv.config(), the library searches your root project folder for a file named exactly .env.
//However, passing an options object with a path property allows you to change that default behavior.
dotenv.config({
  path: './env'
})

//when async function is completed a promise is returned
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Listning on Post ${process.env.PORT}`);
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
