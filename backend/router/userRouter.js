import express from "express";
const userRouter = express.Router();
import multer from "multer";

// import controllers
import { signupUser, signinUser, getUser, logoutUser, updateUser } from "../controllers/userController.js"

// import middlewares
import { isLogout, isLogin } from "../middleware/auth.js";

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

// import session
import session from "express-session";
const oneDay = 1000 * 60 * 60 * 24;
const oneMin = 1000 * 10;
userRouter.use(session({ secret: "AMITSHARMA", resave: false, saveUninitialized: false, cookie: { maxAge: oneDay, secure: false } }));

// import cookie-parser
import cookieParser from "cookie-parser";
userRouter.use(cookieParser());

// import body-parser
import bodyParser from "body-parser";
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.use(express.json());
userRouter.post("/", isLogout, signinUser);
userRouter.get("/", getUser);
userRouter.get("/:id", getUser);
userRouter.get("/logout", isLogin, logoutUser);
userRouter.post("/signup", upload.single('image'), signupUser);
userRouter.put("/:id", upload.single('image'), updateUser);

export default userRouter;