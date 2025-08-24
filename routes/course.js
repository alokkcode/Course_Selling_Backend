const { Router } = require("express");
const courseRouter = Router()

courseRouter.post("/purchase", function (req, res) {// endpoint when an user wants to purchase a course  
    // we can add purchase logic and razorpay endpoint here later 
    res.json({
        message: "purchased abcd course"
    })
})

courseRouter.get("/preview", function (req, res) {// all my current courses 
    res.json({
        message: "these are your courses"
    })
})

module.exports = {
    courseRouter: courseRouter
}