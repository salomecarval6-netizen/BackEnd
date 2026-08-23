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
import cokkieParser from "cookie-parser";

const app= express();

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
app.use(express.json({limit: "16kb",}))    
//express.json(): In older versions of Express, you had to install an external package called body-parser to read incoming requests. Modern Express has this parser built directly into its core. It intercepts the incoming string of data, parses(acts as the translator ) it into a clean JavaScript object, and attaches it directly to req.body so that Express serve can read/understand it.
//thus The middleware intercepts the raw string, checks if it is JSON, and translates it.The req.body becomes a clean JavaScript object.


//C. URL-Encoded Form Data Parser:  [Built-in Middleware]
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//Translates data sent from native HTML form submissions (where data looks like name=john&age=25 instead of JSON). The extended: true configuration enables parsing of deeply nested objects and arrays.



//D. Static Asset Files Server:  [Built-in Middleware]
app.use(express.static("public"));
//Instructs Express to serve local files (like raw images, assets, or static PDFs) directly out of a specified local directory without needing separate route files.


//E.  Cookie Parser: Translates secret browser cookies into readable JavaScript objects[THIRD-PARTY MIDDLEWARE]
app.use(cookieParser());
//Parses the cookie header strings attached to incoming requests and populates req.cookies with a clean object, allowing you to read secure login tokens easily.





//2. MOUNT APPLICATION ROUTES Route-Specific application: only guards /


//3. MOUNT GLOBAL Error-Handling Middleware (err, req, res, next).

export default app;