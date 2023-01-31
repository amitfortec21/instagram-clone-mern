import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name!"]
    },
    email: {
        type: String,
        required: [true, "Please enter email!"]
    },
    password: {
        type: String,
        required: [true, "Please enter password!"]
    },
    mobile: {
        type: Number,
        required: [true, "Please enter mobile number!"],
        minLength: [10, "Mobile cannot exceed 10 characters!"]
    },
    city: {
        type: String,
        required: [true, "Please enter city!"]
    },
    image: {
        type: String,
        default: "imgdemo.jpg"
    },
    is_admin: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

export default mongoose.model("user", userModel);