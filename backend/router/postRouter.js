import express from "express";
const postRouter = express.Router();
import multer from "multer";

// import controllers
import { createPost, getPosts } from "../controllers/postController.js"

// image upload code start
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({storage: storage});
// image upload code end

// import body-parser
import bodyParser from "body-parser";
postRouter.use(bodyParser.json());
postRouter.use(bodyParser.urlencoded({ extended: true }));

postRouter.use(express.json());
postRouter.post("/create", upload.single('image'), createPost);
postRouter.get("/:id", getPosts);
postRouter.get("/", getPosts);

export default postRouter;