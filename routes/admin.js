const { Router } = require("express");
const adminRouter = Router();
const { z } = require("zod");
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_SECRET } = require("../config");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
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

        await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(50).email(),
            password: z.string().min(6)
        })

        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedDataWithSuccess.success) {
            res.status(400).json({
                message: "Incorrect Format",
                error: parsedDataWithSuccess.error
            })
            return
        }

        const { email, password } = req.body;

        const admin = await adminModel.findOne({
            email: email
        })

        if (!admin) {
            res.status(403).json({
                message: "Admin does not exist "
            })
            return
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
            const token = jwt.sign({
                id: admin._id.toString()
            }, JWT_ADMIN_SECRET);

            res.json({
                token: token
            })

        } else {
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }

    } catch (err) {
        console.log("Signin error:", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


adminRouter.post("/course", adminMiddleware, async function (req, res) { // to create a course by admins
    const adminId = req.userId;

    const { title, description, price, imageUrl } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        message: "Course Created ",
        courseId: course._id
    })
})


adminRouter.put("/course", adminMiddleware, async function (req, res) { // to update say , name of course by admins of their respective courses
    const adminId = req.userId;
    const { title, description, price, imageUrl, courseId } = req.body;

    const updatedCourse = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl
    });

    if (updatedCourse.matchedCount === 0) { // matchedCount will be 0 (no document matched filter)
        return res.status(403).json({
            message: "Not authorized to update this course or course not found"
        });
    }
    res.json({
        message: "Course Updated",
        courseId: updatedCourse._id
    })
})


adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) { // admin can get all their courses
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "Here are your courses ",
        courses: courses
    })
})


module.exports = {
    adminRouter: adminRouter
}