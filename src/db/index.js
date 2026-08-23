import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"; //sometimes file extension is also necesarry in

const connectDB = async()=>{
  try{

    const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME }`);
//mongoose gives a returned object.

    console.log(`\nMongoDB connected!! DB host : ${connectionInstance}`);
//DB connection for production/development is diff so to know which console and see
  } catch(error){
    console.log(error);
    process.exit(1) //built in  method instructs Node.js to terminate the process synchronously with an exit status of code.
  }
}

/*connectionInstance is a complex JavaScript object returned by Mongoose. When you inject a raw object directly into a template literal string using ${connectionInstance}, 
JavaScript forces it into a string format, printing out as DB host : [object Object] instead of showing the actual host name */



export default connectDB;