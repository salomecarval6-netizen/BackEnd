SEARCH : mongodb atlas



In MongoDB Atlas, a cluster is a group of connected server nodes that jointly host, store, and manage your databases. 



1.Set up env variables:



PORT= 8000

MONGODB\_URL=



// The Anatomy of a MongoDB URI:

MongoDB requires a very specific connection string format to find your data. The standard format looks like this:



mongodb+srv://<username>:<password>@cluster.mongodb.net/<database\_name>



//Security (Why we use process.env.MONGODB\_URL):
Your cluster link contains your database password. If you paste that link directly into your code and push it to GitHub, your password becomes public.

The Solution: Hide the cluster address inside a hidden .env file and read it via process.env.MONGODB\_URL.



//Flexibility and Reusability (Why we use DB\_NAME):
Your application might use different database buckets for different environments, but the cluster remains the exact same.

Development: You might want your data to save to a database named test\_db.

Production: When the website goes live, you want it to save to production\_db.

The Solution: By keeping ${DB\_NAME} as a variable, you can change your entire target database by editing a single word in a local configuration file, without ever touching or risking your core connection code.







2.constants.js:

export const DB\_NAME="videotube"



Since its not any system specific variable thus added it inside constants





3\. 2 types of DATABASE connection:



A) Since we firstly excute index.js file thus write entire db code inside index file

B) Make a db folder and write connection function inside it export this function and import inside your inside file(more cleaner/modular)



**app.js-> through express**

**database connection-> through mongoose**



Diferrent Packages to be used/installed from npm documentation:



dotenv

mongoose

express



**npm i mongoose express dotenv**



U can check them in package.json if they are installed




4\. index.js file:



**DATABASE:** 

* Wrap inside try-catch block OR promises
* DB is in another continent. Thus it requires time to fetch thus async-await





INSIDE PACKAGE.JSON scripts: "dev" : "nodemon -r dotenv/config experimental-json-modules src/index.js"



A---------This code connects your Express application to your MongoDB Atlas database using Mongoose inside an IIFE (Immediately Invoked Function Expression).---------------------->



import mongoose from "mongoose"; 	//Loads the library used to talk to MongoDB.

import {DB\_NAME} from "./constant";

import dotenv from "dotenv"; // 1. Add this import

import express from "express";



dotenv.config({

&#x09;path: '/



); // 2. Add this line to load environmental variables as early as possible

const app= express();			//Initializes your Express web server application.



//IFEE

(async ()=>{

&#x20; try{

&#x20;   await mongoose.connect(`${process.env.MONGODB\_URL}/${DB\_NAME}`);

&#x20;   app.on("error",(error)=>{

&#x20;     console.log(error);

&#x20;     throw error;

&#x20;   })

/\*

mongoose.connect(uri, options);

uri (String): The absolute connection URL pointing to your local or cloud database.

options are optinal

const options = {

&#x20; autoIndex: true,       // Build indexes automatically (set false in production for speed)

&#x20; maxPoolSize: 10,       // Maintain up to 10 socket connections simultaneously

&#x20; serverSelectionTimeoutMS: 5000, // Keep trying to connect for 5 seconds before failing

&#x20; socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity

};

\*/



&#x20;   app.listen(process.env.PORT,()=>{

&#x20;     console.log(`App is listenig on port ${process.env.PORT}`);

&#x20;   });

&#x20; } catch(error){

&#x20;   console.error("ERROR",error);

&#x20;   throw error    // manually triggering an exception to immediately stop the code execution because something went wrong. 

&#x20; }

})()



<------------------------------------------











B-----------IN DIFF DB FOLDER AND USE IN index.js--------------->







import mongoose from "mongoose";

import { DB\_NAME } from "../constant";



const connectDB = async()=>{

&#x20; try{



&#x20;   const connectionInstance= await mongoose.connect(`${process.env.MONGODB\_URL}/${DB\_NAME }`);

//mongoose gives a returned object.



&#x20;   console.log(`\\nMongoDB connected!! DB host : ${connectionInstance}`);

//DB connection for production/development is diff so to know which console and see

&#x20; } catch(error){

&#x20;   console.log(error);

&#x20;   process.exit(1) //built in  method instructs Node.js to terminate the process synchronously with an exit status of code.

&#x20; }

}







export default connectDB;









index.js:























<-------------------------

