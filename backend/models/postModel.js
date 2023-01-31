import mongoose from "mongoose";

const postModel = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "Please insert id!"]
    },
    title: {
        type: String,
        required: [true, "Please enter title!"]
    },
    image: {
        type: String,
        required: [true, "Please insert an image"]
    },
}, {timestamps: true});

export default mongoose.model("post", postModel);