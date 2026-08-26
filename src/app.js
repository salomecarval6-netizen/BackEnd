import express from "express";
/*
app.METHOD(PATH, HANDLER);

Where:
app is an instance of express.
METHOD is an HTTP request method, in lowercase.
PATH is a path on the server.
HANDLER is the function executed when the route is matched.


app.use() catches all HTTP methods (GET, POST, PUT, DELETE, etc.) and treats paths as a prefix.
 is used to bind middleware to your application’s request-processing pipeline.
It allows you to execute code, modify incoming request (req) and response (res) objects, and intercept traffic before it reaches your final route handlers.


*/

import cors from "cors";
import cookieParser from "cookie-parser"; 



const app= express();
/*
Every middleware function registered via app.use() gets access to three parameters: req (Request), res (Response), and next.
The next() function is critical. If a middleware doesn't call next(), the request gets stuck at that checkpoint forever, and your user's browser will just spin indefinitely.

The Anatomy of app.use():
In Express, app.use() is the configuration method used to register middleware functions in your application.Think of it like a security and checkpoint conveyor belt. Every single HTTP request (GET, POST, etc.) that hits your server must travel down this belt. app.use() lets you install checkpoints along the belt to inspect, modify, or block the request before it reaches your final route handlers.

It can be used in two main ways:

1. Globally (Applies to EVERY single request)
If you don't provide a path as the first argument, the middleware will run for every single request your server receives.
// Allows your application to read incoming JSON data
app.use(express.json()); 
// Allows your application to read and parse cookies from browser requests
app.use(cookieParser()); 

2. Path-Specific (Applies only to routes matching a specific prefix)If you provide a string path as the first argument, the middleware will only trigger when the request URL starts with that path.
// Only triggers when someone accesses an URL starting with /api/v1/users
app.use("/api/v1/users", userRouter); 

*/

//A. Cross-Origin Resource Sharing (CORS)
// 1. Global Middleware are intermediate functions in Express that execute sequentially on every single incoming HTTP request to your server, regardless of the target URL path or method.
app.use(cors({ //[THIRD-PARTY MIDDLEWARE]
  origin: process.env.CORS_ORIGIN,
  credentials: true,  //Allows the browser to send cookies/tokens along with requests
  methods: ["GET", "POST", "PUT", "DELETE"] // Restricts what types of requests can be made
})) 
//a middleware configuration that allows cross-origin requests to your backend server, effectively disabling the browser's restrictive Same-Origin Security Policy
//In a professional project, you pass a configuration object into cors() to restrict access to only your specific frontend URL.

//B. JSON Request Body Parser:  [Built-in Middleware]
app.use(express.json({limit: "16kb",}))     //Allows your application to read incoming JSON data
//express.json(): In older versions of Express, you had to install an external package called body-parser to read incoming requests. Modern Express has this parser built directly into its core. It intercepts the incoming string of data, parses(acts as the translator ) it into a clean JavaScript object, and attaches it directly to req.body so that Express serve can read/understand it.
//thus The middleware intercepts the raw string, checks if it is JSON, and translates it.The req.body becomes a clean JavaScript object.


//C. URL-Encoded Form Data Parser:  [Built-in Middleware]
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//Translates data sent from native HTML form submissions (where data looks like name=john&age=25 instead of JSON). The extended: true configuration enables parsing of deeply nested objects and arrays.



//D. Static Asset Files Server:  [Built-in Middleware]
app.use(express.static("public"));
//Instructs Express to serve local files (like raw images, assets, or static PDFs) directly out of a specified local directory without needing separate route files.


//E.  Cookie Parser: Translates secret browser cookies into readable JavaScript objects[THIRD-PARTY MIDDLEWARE]
app.use(cookieParser());  // Allows your application to read and parse cookies from browser requests
//Parses the cookie header strings attached to incoming requests and populates req.cookies with a clean object, allowing you to read secure login tokens easily.




//2. MOUNT APPLICATION ROUTES Route-Specific application: only guards /
import userRouter from "./routes/user.routes.js";


//http://localhost:8000/api/v1/users/register
app.use('/api/v1/users', userRouter)
//here userRouter is the middleware


//3. MOUNT GLOBAL Error-Handling Middleware (err, req, res, next).
//WHENEVER THE NEXT(ERR) WRIITEN INSIDE ASYNCHANDLER RUNS CONTROL IS TRANSFERED HERE
// Express identifies this as an error-handler strictly because it features exactly 4 parameters.
app.use((err, req, res, next) => {
    
    // Fall back to a 500 Internal Server Error if the error object doesn't have a status code
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong on the server";

    // Log the error to your server console so you can debug it during development
    console.error(`[SERVER ERROR] ${statusCode} - ${message}`);

    // Return a uniform, clean JSON response that your frontend app can intercept easily
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        errors: err.errors || [], // Captures validation error arrays if any exist
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined // Hides stack traces in production
    });
});

export default app;