const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const { userModel } = require("../db");
const { JWT_USER_SECRET } = require("../config");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


userRouter.post("/signup", async function (req, res) {
    const requiredBody = z.object({ 
        email: z.string().min(3).max(50).email(),
        password: z.string().min(6).max(100).refine(function (val) {
            return /[A-Z]/.test(val);
        }, {
            error: "Password must contain at least one uppercase character"
        }).refine(function (val) {
            return /[a-z]/.test(val);
        }, {
            error: "Password must contain at least one lowercase character"
        }).refine(function (val) {
            return /[^a-zA-Z0-9]/.test(val);
        }, {
            error: "Password must contain at least one special character"
        }),

        firstName: z.string(),
        lastName: z.string()
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
        return
    }

    const { email, password, firstName, lastName } = req.body;
    let errorThrown = false;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
    } catch (e) {
        res.json({
            message: "User already exists"
        })

        errorThrown = true;
    }

    if (!errorThrown) {
        res.json({
            message: "You are signed up"
        })
    }

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