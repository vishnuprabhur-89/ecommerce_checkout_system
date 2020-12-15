var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(bodyParser.urlencoded({ extended: false, useUnifiedTopology: true }));
app.use(bodyParser.json());
app.use(cors());

var Router = require("./routers/routers.js");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/checkoutSys");

app.use('/', Router);

app.listen(5000, function () {
    console.log("Server is running 5000");
});
