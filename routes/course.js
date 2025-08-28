const { Router } = require("express");
const courseRouter = Router()
const { userMiddleware } = require("../middleware/user");
const { purchasesModel, courseModel } = require("../db");

courseRouter.post("/purchase", userMiddleware, async function (req, res) {// endpoint when an user wants to purchase a course  
    // we can add purchase logic and razorpay endpoint here later 

    try {
        const userId = req.userId;
        const courseId = req.body.courseId;

        const existingPurchase = await purchasesModel.findOne({
            userId: userId,
            courseId: courseId
        });

        if (existingPurchase) {
            return res.status(400).json({
                message: "You have already purchased this course"
            });
        }

        await purchasesModel.create({
            userId,
            courseId
        })

        res.json({
            message: "You have successfully purchased the course"
        })
    } catch (err) {
        console.error("Purchase error:", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

})

courseRouter.get("/preview", async function (req, res) {// all the current course on the platform
    const courses = await courseModel.find({}); 

    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}