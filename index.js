require('dotenv').config();

const express = require("express");
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const jwt = require("jsonwebtoken");


const app = express();


app.use("/user", userRouter);
app.use("/course", courseRouter); 
app.use("/admin", adminRouter); 


app.listen(3000, () => {
    console.log("Server running on port 3000");
})


