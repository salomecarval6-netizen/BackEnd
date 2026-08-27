//as soon as a video is seen by the user push the id of the video in array of id

// the userSchema acts as the blueprint (defining what data is allowed), 
// the User model is the actual construction manager that interacts with MongoDB.

import mongoose, {Schema} from "mongoose";

//Plugins are reusable tools used to share hooks, middleware, and schema modifications across multiple Mongoose schemas.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // 1. Import the plugin

/*
mongoose.paginate is a popular Mongoose plugin used to split large sets of database documents into smaller, manageable chunks (pages) instead of loading all data at once.

The plugin provides a clean .paginate() method that handles all the heavy lifting in a single execution block:

const options = {
  page: 2,   // The page number you want to view
  limit: 10, // How many items to show per page
  sort: { createdAt: -1 }, // Sort by newest first (-1)
  select: "title description thumbnail duration", // Fetch only these specific fields
  populate: { path: "owner", select: "username avatar" } // Joint-venture fetch user profile details
   
};

// Returns both the data AND helpful metadata in one shot
const result = await Video.paginate({}, options);

Model.paginate(query, options):

query (Object): Your standard Mongoose search filter (e.g., { isPublished: true }). Leave it empty {} if you want to fetch all documents.
options (Object): Configuration settings that control the pagination, sorting, and data population.


When you run .paginate(), it returns an object containing your requested items along with critical pagination metadata that your frontend needs to build pagination controls (like "Next" and "Previous" buttons)
*/
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true   //makes the particular field easily searchable in DB
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname:{
      type: String,
      required: true,
      trim: true,
      index: true   
    },
    avatar:{
      type: String, //cloudinary URL
      required: true,
    },
    coverimage:{
      type: String, //cloudinary URL
    },
    watchhistory:[
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    password:{
      type: String,
      required: [true,'Password is required.']
    },
    refreshToken:{
      type: String,
    }
//{ timestamps: true }: Automatically injects createdAt and updatedAt date fields into every document.
},{timestamps: true})


// 2. Inject the plugin functionality directly into your schema rules.
//A plugin is simply a JavaScript function that takes a Mongoose schema as an argument. Inside that function, you can attach hooks, helper methods, or new fields.
userSchema.plugin(mongooseAggregatePaginate);     // Apply the plugin to your schema



/*
1. mongooseAggregatePaginate: The pre-written recipe (the package code).
2. userSchema.plugin(...): Injects that recipe right into your User blueprint.
3. User.mongooseAggregatePaginate(...): The newly generated method you call to get neatly sliced pages of database results automatically.
*/

//By injecting this plugin, you equip your User model with advanced pagination powers. If you want to fetch a user's watch history or list users, instead of loading 10,000 records at once and crashing your server, you can pass simple page blocks (page: 1, limit: 10) to slice database responses cleanly.


//its a middleware thus will require access of next. So that once this function is being completely executed pass on the flag to the next middleware or router.

//When you define a middleware as async, Mongoose manages the control flow automatically through the Promise lifecycle. If you try to pass next into an async function, Mongoose does not supply the callback function, leaving the parameter undefined and causing the TypeError: next is not a function crash.
userSchema.pre("save", async function(next) {
  //only when password field is saved or send then only execute this
// If a user updates their avatar or email, you do not want to re-hash their already-hashed password. This check ensures encryption only runs when the password field is physically changed.  
  if(!this.isModified("password"))  //return next(); NO NEED
      return; // Just return to skip

  // Generate the secure hash (using 10 auto-generated salt rounds)
  this.password= await bcrypt.hash(this.password, 10);
  // No next() call needed here at the end since Since your function is declared as async, returning out of the function implicitly resolves a JavaScript promise, signaling Mongoose to advance automatically.
})

//CUSTOM INSTANCE METHODS: 
//Any function attached to userSchema.methods becomes instantly available on individual user records fetched from the database (e.g., user.isPasswordCorrect()).

//Arrow functions do not have their own this context. By using a standard function, the this keyword correctly points to the current user document loaded from your MongoDB collection. This is what allows you to read the encrypted password using this.password.
// Compare the input password with the hash pulled from your database bcrypt.compare(loginPassword, hashedPassword); 
userSchema.methods.isPasswordCorrect= async function(password){

     return await bcrypt.compare(password, this.password);
};


//Access Token: Short-lived (e.g., 15 minutes). Used to access data.

//userSchema.methods.generateAccessToken: By attaching this to methods, you make it available on any individual user document fetched from the database.
//function () { ... }: Crucial Detail: You must use a regular function here, not an arrow function (() =>). Regular functions preserve the keyword this, allowing you to access that specific user's database properties (like this._id and this.email).

//The value is returned directly back to the Controller function that originally called your .isPasswordCorrect() method.
userSchema.methods.generateAccessToken= function (){
  return jwt.sign(
        {//payload object:This object contains the user information you want to embed directly inside the token.
          _id: this._id,
          email: this.email,
          username: this.username,
          fullname: this.fullname
        },
        //access token
        process.env.ACCESS_TOKEN_SECRET,
        //expiry object
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
      )
}
//Access token is short-lived while Refresh token is long-lived.
//Validation of user is done using AccessToken but just to avoid repetitive login of user we give refreshToken to hit the same endpoint as the refresh token we have
//Refresh Token: Long-lived (e.g., 10 days). Stored in your database and used only to request a brand-new Access Token when the short-lived one expires.
userSchema.methods.generateRefreshToken= function (){
  return jwt.sign(
        {//payload
          _id: this._id,
        },
        //access token
        process.env.REFRESH_TOKEN_SECRET,
        //expiry object
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
      )
  
}


export const User= mongoose.model("User",userSchema);

//inside mongoDB its saved with name "users" i.e lowercase and plural

//User is a Mongoose Model.The User object gives you access to built-in Mongoose database methods (like queries, updates, and deletions). You will use this exact User model inside your controller to handle registration, login, and queries.
//Thus we can talk with MongoDb only with this User object.
/*
// Creates a new user row matching your schema constraints
const newUser = await User.create({ username, email, password });


// Looks up a user in MongoDB by their email or username
const existingUser = await User.findOne({ email });


// Finds a user by ID and pushes a new video ID into their watch history array
await User.findByIdAndUpdate(userId, {
    $push: { watchhistory: videoId }
});
*/
