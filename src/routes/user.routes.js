import {Router} from "express";
//Router is an isolated instance of middleware and routes. 
//It allows you to break your main application down into smaller, modular, and manageable pieces instead of writing all your API endpoints in one giant file.
import { registerUser } from "../controllers/user.controller.js";

import upload from "../middlewares/multer.middleware.js";

const router = Router();
//With a router, you create departments. Send everything starting with /users to the User Department (Router), and let that department handle the specific doors like /register or /login.

router.route('/register').post(
//upload.fields(...) runs first. It intercepts the raw file streams, saves them to a temporary location, and formats the data.
  
//upload.fields() is a middleware 
upload.fields([// to accept multiple files coming from different input fields at the same time
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),  
    
  registerUser)
//Chainable route handler: 
// When an HTTP POST request hits /register, it first runs the Multer middleware to process file uploads, then hands control over to the registerUser function to execute the main business logic.


//Before adding Multer, all incoming data was accessible via req.body. Now it splits the incoming data. 
//req.body: Contains all your standard text inputs (e.g., username, email, password).
//req.files: A custom object created by Multer containing your uploaded file metadata.

export default router;