//as soon as a video is seen by the user push the id of the video in array of id

import mongoose, {Schema} from "mongoose";

//Plugins are reusable tools used to share hooks, middleware, and schema modifications across multiple Mongoose schemas.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // 1. Import the plugin
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

},{timestamps})


// 2. Inject the plugin functionality directly into your schema rules.
//A plugin is simply a JavaScript function that takes a Mongoose schema as an argument. Inside that function, you can attach hooks, helper methods, or new fields.
userSchema.plugin(mongooseAggregatePaginate);
/*
1. mongooseAggregatePaginate: The pre-written recipe (the package code).
2. userSchema.plugin(...): Injects that recipe right into your User blueprint.
3. User.mongooseAggregatePaginate(...): The newly generated method you call to get neatly sliced pages of database results automatically.
*/

//its a middleware thus will require access of next. So that once this function is being completely executed pass on the flag to the next middleware or router.
userSchema.pre("save", async function(next) {

  //only when password field is saved or send then only execute this
  if(!this.isModified("password"))  return next();

  // Generate the secure hash (using 10 auto-generated salt rounds)
  this.password= bcrypt.hash(this.password, 10);
  next();
})


//Arrow functions do not have their own this context. By using a standard function, the this keyword correctly points to the current user document loaded from your MongoDB collection. This is what allows you to read the encrypted password using this.password.
userSchema.methods.isPasswordCorrect= async function(password){
// Compare the input password with the hash pulled from your database bcrypt.compare(loginPassword, hashedPassword); 
     return await bcrypt.compare(password, this.password);
};


//Access Token: Short-lived (e.g., 15 minutes). Used to access data.
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

//inside mongoDB its saved with name "users"