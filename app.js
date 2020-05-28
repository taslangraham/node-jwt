const express = require('express');
const app = express();

const bodyParser = require("body-parser"); //use to parse incoming request bodies 
const db = require("./db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
app.use('/user', userRoutes); //tells express to forward user routes to routes/users.js

module.exports = app; // this should be the last line in your file
