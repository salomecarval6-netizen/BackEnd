



Server: Software that serves







Node.js is just the runtime of JS







2 MAJOR COMPONENTS:







1.Programming Language: Java(SpringBoot/Spring), JS(lib: mongoose,express), PHP(laravel), golang, C++(cro)



\&#x20;(in each of this use of either a framework / library)



A framework is a pre-built structure or blueprint that provides a foundation for developing software applications. Instead of building everything from scratch, developers use a framework to handle repetitive tasks, enforce code organization, and accelerate development.



Angular, Ruby on Rails, Django







A library is a reusable collection of pre-written code snippets, functions, or methods that you can import into your project to solve specific, isolated problems. Instead of writing complex logic from scratch, you call the library to do the heavy lifting for you.



Lodash, Axios, jQuery







2.Database: Mongo, MySql, Postgres, Sqlite



(ORM/ODM)







\&#x09;  API



Browser <-----> Backend <------> DB \\\[Always present in OTHER CONTINENT]







Call to backend from FrontEnd to speicific routes







Backend:



Just consists of functions which interact with DB and accordingly provide a response(in API format) to frontend







API is just returned value in JSON format(usually), T/F, number











JS BASED BACKEND:







To deal with DATA, FILE, API(third party)







A JS runtime: Node.js, Deno, Bun







\&#x20;(







Libraries:



Express(Routing), Mongoose(DataBase)







File Structure:







src directory : contains Package.json , .env, Readme, git, lint, prettier







2



\*\*General Directory Structure of Backend:\*\*







\*\*FILES:\*\*



index file: DB connects (entry point of applications)



APP: config, cookie,



constants: enums, DB-name







\*\*Directory Structure:\*\*



DB



Models: Schema/structure/sample of Data to be stored in DB (each DB/library has its own/diff structure)



Controllers: functionality / methods to process data



Routers: /login, /signup only accept this



Middlewares: 



Utils: utility (when at multiple place to be placed same thing)



More(depends)…..







&#x09;   REQUEST(get)



Computer --------------->     server (code)



&#x09;  Express(package)	Listen



&#x09; <----------------    /: home route



&#x09;    RESPONSE













START:





1\. npm init



This utility will walk you through creating a package.json file.



It only covers the most common items, and tries to guess sensible defaults.





Make index.js file in backend folder







2."scripts": {



&#x20;  "start": "node index.js"



&#x20;  }











3.npm run start









npm is the registry for all JavaScript packages, not just React libraries.



Every tool, framework, and library written in JavaScript or TypeScript is published to npm so developers can easily install them.





4\. follow express doc





EXPRESS:



//INSTALLATION OF PACKAGE JUST ONCE INSIDE A FOLDER



1\. npm install express





2\. Start the Server

//EVERYTIME U MAKE/SAVE CHANGES START THE SERVER AGAIN

node index.js OR npm run start





1\. Import and Initialize Express

const express = require('express'); OR import express from "express"	// Imports the installed Express module into your script.



const app = express();		// Instantiates the framework. The resulting app object contains methods to handle routes, configure middleware, and listen for web requests.



const port = 3000;		//Defines the network port where your web server will listen for local incoming traffic





2\. Define the Route Handler

app.get('/', (req, res) => {	// Sets up a route that listens specifically for HTTP GET requests

&#x09;			//'/': Specifies the root URL

//(req, res) => { ... }: A callback function executed whenever a user hits the root route.req (Request): Holds information sent by the user (like headers or query parameters).res (Response): Handles sending data back to the user



&#x20; res.send('Hello World!');	// Sends the plain text string back to the user's browser

});





3\. Start the Web Server

app.listen(port, () => {	//app.listen(...): Binds the application to your specified port (3000) and boots up the backend HTTP server.



&#x20; console.log(`Example app listening on port ${port}`);

});





Here the app isn't closed.

Since the appliaction is continuosly listening.

This only is server.









ENVIRONMENT VARIABLE:



//to store all sensitive / configuration values shouldn't be hard-coded. Thus store them in .env file and access it inside node.js using process.env.VariableName.



dot env



1\. npm install dotenv



2.Create file named .env



3.In index.js write: require ('dotenv').config()



4\. app.listen(process.env.PORT, () => {

&#x20;   console.log(`Example app listening on port ${port}`);

&#x20;  });



app.listen(...): This is an Express method that tells your server to start up and wait for network traffic at a specific address (port).



process.env.PORT: This reads the port number from your computer's environment variables.Production hosting platforms (like Render, Heroku, or AWS) use this variable to dynamically assign an open port to your app.



() => { ... }This is a callback function.It runs automatically exactly once, right after the server successfully starts up.



console.log(...)This prints a confirmation message to your terminal so you know the server is running.





5\. Make a .gitignore file so as to not push that file on gitHub.

.gitignore: tells git which files/folders it shouldnt track



6\. git init

&#x20;  git add .

&#x20;  git commit -m "first commit"

&#x20;  git branch -M main

&#x20;  git remote add origin https://github.com/salomecarval6-netizen/BackEnd.git

&#x20;  git push -u origin main



Thus code now on Git



7\. Use any app to deploy





JSON FORMATTER TO SEE THE ACTUAL RESPONSE OBJECT.



To design frontend:

These are various ToolChains/Bundlers: helps in bundling of all js files into what browser can understand

1.VITE

2.CREATE REACT APP

3.PERCEL



Always keep in mind the port number since while production the port no can be different than your frontend port.

If the port no is not known then error.







index.js (using Express.js): creates the server and sets up endpoints to receive and handle requests.

**Express in index.js (The Server)**: Acts as the backend receiver.Defines routes (like app.get('/api/data', ...) ) to listen for incoming web traffic.Processes data, talks to databases, and sends back responses.





app.js uses Axios to send out HTTP requests to fetch or send data

**Axios in app.js (The Client / Requester)** : Acts as the frontend sender (or a script calling an external API).Triggers network requests (like axios.get('/api/data')) to get data from your Express.js route or a third-party server.Automatically parses incoming JSON and manages promises without extra boilerplate steps





The Lifecycle of the Data:
**Express (index.js)** sits waiting, listening on a specific port (e.g., http://localhost:5000/api/data).

&#x09;					|

React (app.jsx) mounts in the browser and triggers axios.get('http://localhost:5000/api/data').

&#x09;					|

Express (index.js) receives the request, pulls data from a database, and sends it back.

&#x09;					|

React (app.jsx) receives the Axios response, updates its state, and displays the data to the user.





BACKEND:

Your backend must actively permit requests originating from your frontend's port. Double-check that your main backend file contains the CORS(Cross Origin Request) middleware

npm install cors

const cors = require('cors');

app.use(cors()); // Allows frontend to safely read API data




