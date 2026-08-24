import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"; //sometimes file extension is also necesarry in

// Inside src/db/index.js
import dotenv from "dotenv";
dotenv.config({ path: './.env' }); // Explicitly force reload here


const connectDB = async()=>{
  try{
    const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//mongoose.connect() returns a promise that's resolved to Mongoose instance/object

    console.log(`\nMongoDB connected!! DB host : ${connectionInstance}`);
    //console.log(connectionInstance.connection);
    //console.log(connectionInstance.connection.host);
  //DB connection for production/development is diff so to know which console and see
  } catch(error){
    console.log(error);
    process.exit(1) //built in  method instructs Node.js to terminate the process synchronously with an exit status of code.
  }
}

/*connectionInstance is a complex JavaScript object returned by Mongoose. When you inject a raw object directly into a template literal string using ${connectionInstance}, 
JavaScript forces it into a string format, printing out as DB host : [object Object] instead of showing the actual host name */



export default connectDB;