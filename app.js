var express = require('express');
var mongoose = require('mongoose');
let bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/libraryApp');

let books = require('./Models/BookModels');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let bookRoutes = require('./Routes/BookRoute')(books);

app.use('/api/books',bookRoutes);

app.get('/',(req,res)=>{
    res.send("Welcome!");
});

app.listen(port,()=>{
    console.log("server is running");
});