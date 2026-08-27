import {Router} from "express";
//Router is an isolated instance of middleware and routes. 
//It allows you to break your main application down into smaller, modular, and manageable pieces instead of writing all your API endpoints in one giant file.
import { loginUser, logoutUser, registerUser,refreshAccessToken,changeCurrentPassword,
  getCurrentUser,updateAccountDetails,   updateUserAvatar,
  updateUserCoverImage,
  deleteCoverImg,
  getUserChannelProfile ,
  getWatchHistory} from "../controllers/user.controller.js";

import upload from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
//import { verify } from "jsonwebtoken";

const router = Router();
//With a router, you create departments. Send everything starting with /users to the User Department (Router), and let that department handle the specific doors like /register or /login.

/*
When you use form-data to send files, a standard Express server cannot parse the textual fields (like email and password) using express.json().
Multer is thus used as a middleware to handle file uploads, Multer must process the request first before you can access req.body. Multer intercepts the form-data, extracts the files into req.file (or req.files), and populates req.body with your text fields.

What happens behind the scenes:
The request hits your router.
Express sees Content-Type: multipart/form-data and skips express.json().
Multer steps in, reads the incoming stream, saves the file, and puts the text fields into req.body.
Your loginUser controller runs next, and req.body.email is now successfully defined!

*/

router.route('/register').post(
//upload.fields(...) runs first. It intercepts the raw file streams, saves them to a temporary location, and formats the data.
  
//upload.fields() is a middleware.
//Multer's built-in methods (like .fields(), .single(), or .array())
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


// This runs the function IMMEDIATELY at startup!
//router.route("/register").post(registerUser()); 

router.route("/login").post(
  loginUser
)
//WHILE SENDING ONLY TEXT-DATA USE BODY-JSON
//WHILE SENDING FILES ALSO USING FORM-DATA

//securedRoutes:
//here verifyJWT is middleware 
router.route("/logout").post(verifyJWT,
  logoutUser
)

router.route("/refreshToken").post(refreshAccessToken)
//The verifyJWT middleware expects a valid, unexpired Access Token.If you guard your refresh endpoint with verifyJWT, the entire system will break down into a deadlock.
//If you add verifyJWT to this route, this is what happens:The user's Access Token expires.The frontend hits /refreshToken to get a new one.The verifyJWT middleware intercepts the request, checks the Access Token, and sees it is expired.verifyJWT throws an error (401 Unauthorized) and blocks the request from ever reaching your refreshAccessToken controller.
//The /refreshToken endpoint doesn't need verifyJWT because it performs its own internal authentication.
router.route("/getCurrentUser").get(verifyJWT,getCurrentUser)
/*
Step 1: The verifyJWT Middleware Executes First:
This middleware intercepts the request, extracts the access token from the cookies or headers, validates it, and fetches the user from the database. Once it has the user, it attaches it directly to the request object before calling next() to hand over control

// CRUCIAL LINE: Attaching the database user object to the shared 'req' object
    req.user = user; 
    next(); // Tells Express to move to the next function (getCurrentUser)

Step 2: Your getCurrentUser Controller Executes Second:
Because verifyJWT already mutated the req object by adding the user key to it, your controller doesn't need to read cookies, verify JWTs, or make database queries. It simply pulls the pre-loaded data straight out of req.user and sends it back to the client
*/


router.route("/changePassword").post(verifyJWT,changeCurrentPassword)

router.route("/updateAccount").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"),updateUserAvatar)

router.route("/coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/deleteCoverImage").patch(verifyJWT, upload.single("coverImage"), deleteCoverImg)
//use  a PATCH request because you are updating a user profile by clearing out an existing field, rather than deleting an entire asset or document from the database.
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
///c/:username: This targets URLs like /c/john_doe or /c/tech_bytes.
// The :username part is a dynamic route parameter. Whatever the user types after /c/ is captured and sent to the controllers inside req.params.username.
//The colon tells Express: "This part of the URL is a variable. Do not look for a literal folder named ':username'. Instead, treat whatever the user types here as data."
//If a user visits this URL: ://example.com    Express reads it as:username = "tech_guy"      Inside your code, req.params becomes:{ username: "tech_guy" }

router.route("/history").get(verifyJWT,getWatchHistory)
export default router;