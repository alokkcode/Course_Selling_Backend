require('dotenv').config();

const express = require("express");
const jwt = require("jsonwebtoken");


const app = express();


app.post("/users/signup", function(req, res){
    res.json({
        message : "Signup endpoint"
    })
})

app.post("/users/signin", function(req, res){
    res.json({
        message : "Signin endpoint"
    })
})

app.post("/course/purchase", function(req, res){// endpoint when an user wants to purchase a course  
    // we can add purchase logic and razorpay endpoint here later 
    res.json({
        message : "purchased abcd course"
    })
})

app.get("/users/purchases", function(req, res){// all courses have i purchased
    res.json({
        message : "you have abcd courses "
    })
})


app.get("/courses", function(req, res){// all my current courses 
    res.json({
        message : "these are your courses"
    })
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})


