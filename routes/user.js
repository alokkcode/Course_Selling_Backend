const { Router } = require("express");
const userRouter = Router();


userRouter.post("/signup", function (req, res) {
    res.json({
        message: "Signup endpoint"
    })
})

userRouter.post("/signin", function (req, res) {
    res.json({
        message: "Signin endpoint"
    })
})

userRouter.get("/purchases", function (req, res) {// all courses have i purchased
    res.json({
        message: "you have abcd courses "
    })
})


module.exports = {
    userRouter : userRouter
}