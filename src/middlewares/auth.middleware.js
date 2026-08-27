import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; //  Correct relative path


//to check is true login

//Technically, you are completely right: the try/catch block here is redundant for catching basic crashes because asyncHandler is already sitting right outside to catch any rejected promises.
//1. Intercepting and Customising Third-Party Errors
//Without try/catch: The raw, messy error string from the third-party library would bypass your system and flow straight into asyncHandler. Your global error middleware would then send a generic 500 Internal Server Error to your client.
//With try/catch: You intercept that raw error immediately, catch its message (error?.message), and wrap it inside your uniform ApiError(401, ...) class before passing it along. This keeps your API responses consistent and clean.

//2. Ensuring the Server responds with a 401 Unauthorized statusIf something goes wrong during token verification, it is an authentication failure, which must return an HTTP 401 Unauthorized status code.By using a try/catch block, you force every single unexpected error caught during this process to throw a 401 ApiError in the catch block. If you let asyncHandler catch a generic database error or syntax error natively, it might default to a 500 Server Error, which misrepresents what actually went wrong to the client app.



//while using/making middleWare next is necesaary: apna kam is done ab japa peh aage leke jana hai leh jao(either response/next middleware)
export const verifyJWT= asynchandler(async(req,_,next)=>{//since res is not used
  //Tokens are send as : Authorization: Bearer <token>
 try {
   //req.cookies is for reading data that the browser sent to you.
   const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") //we have access of all cookies since we have app.use(cookie-parser)
//req.cookies?.accessToken: Checks inside the browser's secure cookie storage (enabled by your cookie-parser middleware).
//req.header("Authorization"): Checks if the token was sent inside the HTTP request headers (standard for mobile applications or frontend frameworks using Bearer tokens). It strips away the prefix string "Bearer " using .replace() to isolate the raw encrypted token string.

//req.cookies.accessToken will give you the token instantly.
console.log(req.cookies.accessToken)

   if(!token){
     throw new ApiError(401, "Unauthorized request")
   }
 
   const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//If it is authentic, it returns the decoded payload (which contains data like { _id: "12345", username: "john" }) and stores it in decodedToken.


   const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
//Using the _id extracted from the verified token payload, the code queries your MongoDB database to ensure this user actually still exists in your system.

   if(!user){
     //discuss about frontend
     throw new ApiError(401,"Invalid AccessToken!!")
   }
 
   req.user= user; //added new filed inside user
//req.user = user: It creates a brand-new custom property named user directly inside the live request lifecycle object and dumps the clean database profile data into it. Because the req object is shared across this entire request path, any controller that runs after this middleware will now have instant access to who is logged in by simply reading req.user.
//thus in our case logoutUser will have access to entire user object
   next()
//next(): It calls the Next function. This signals to Express that the security checkpoint is clear and it is safe to hand control over to the actual destination controller (like updating a profile picture or viewing a dashboard).

 } catch (error) {
    throw new ApiError(401, error?.message||"Invalid AccessToken")
 }

}
)
