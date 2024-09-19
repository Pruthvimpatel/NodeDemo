const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const MONGOURL = "mongodb://localhost:27017/userDB";
const app = express();
const PORT = 8000

// parsing incoming request
app.use(bodyParser.json());

//mongodb connection
mongoose.connect(MONGOURL);

//simple route
app.get("/",(req,res) => {
    res.send("Welcome to user management System");
})

const userRoute = require('./routes/user');
app.use('/api/users',userRoute);
app.listen(PORT,() => {
  console.log(`server listening on port${PORT}`);
})