const { Router } = require("express");
const adminRouter = Router();
const { adminModel} = require("../db");

adminRouter.post("/signup", function (req, res) {
    res.json({
        message: "Signup endpoint"
    })
})

adminRouter.post("/signin", function (req, res) {
    res.json({
        message: "Signin endpoint"
    })
})


adminRouter.post("/course", function (req, res) { // to create a course by admins
    res.json({
        message: "Course Created by Admin"
    })
})


adminRouter.put("/course", function (req, res) { // to change say , name of course by admins
    res.json({
        message: "Course Name changed"
    })
})


adminRouter.get("/course/bulk", function (req, res) { // admin can get all their courses
    res.json({
        message: "Course Created by Admin"
    })
})


module.exports = {
    adminRouter : adminRouter
}