const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const ObjectId = mongoose.ObjectId ;

const userSchema = new Schema({
    email : {type : String , unique : true},
    password : String,
    firstName : String,
    lastName : String
})

const adminSchema = new Schema({
    email : {type : String , unique : true},
    password : String,
    firstName : String,
    lastName : String
})


const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId
})


const purchaseSchema = new Schema({
    userId :   ObjectId,
    courseId : ObjectId
})

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("Admin",adminSchema);
const courseModel = mongoose.model("Courses", courseSchema);
const purchasesModel = mongoose.model("Purchases", purchaseSchema);

module.exports = {
    userModel : userModel,
    adminModel : adminModel,
    courseModel : courseModel,
    purchasesModel : purchasesModel,
}