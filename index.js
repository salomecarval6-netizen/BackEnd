
import dotenv from "dotenv"; //  Modern ES Module syntax
dotenv.config();



//const express = require('express');//old syntax
import express from "express"; // Modern syntax
const app = express();
// 1. Define the port (use the environment variable, or default to 3000 for local testing)
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login',(req,res)=>{
  res.send('If in browser http://localhost:4000/login is runned then o/p is seen');
})

app.get('/html',(req,res)=>{
  res.send('<h1>Returning HTML. Everytime start server</h1>');
  //res.json is also a way to do
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});