import userDB from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
const SECRET_KEY = "AMITSHARMA"

// [-----LOGIC: SIGNUP USER-----]
export const signupUser = async (req, res) => {  
    // get data from client
    const {name, email, password, mobile, city,} = req.body;
    try {
        if(!name || !email || !password || !mobile || !city){
            return res.status(404).json({message: "All fields are required to be filled...!"});
        }
        // 1. existing user check
        const existingUser = await userDB.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: "User already exists...!"})
        }

        // 2. convert plain password to hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. user creation: save user data to backend
        // const createUser = await userDB.create({ name: name, email: email, password: hashedPassword, mobile: mobile, city: city, image: image });
        const createUser = new userDB({
            name: name,
            email: email,
            password: hashedPassword,
            mobile: mobile,
            city: city,
            image: req.file.filename,
        })
        createUser.save()

        // 4. token generate
        const token = jsonwebtoken.sign({ email: createUser.email, id: createUser._id }, SECRET_KEY);

        res.status(201).json({message: "User signed up successfully...!", user: createUser, token: token});

    } catch (err) { res.status(500).json({message:`Error while creating user! => ${err.message}`}) }
}

// [-----LOGIC: SIGNIN USER-----]
export const signinUser = async (req, res) => {  
    // get data from client
    const { email, password } = req.body; 
    try {
        if(!email || !password){
            return res.status(404).json({message: "All fields are required to be filled...!"});
        }
        // 1. existing user check
        const existingUser = await userDB.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message: "User not found...!"});
        }

        // 2. match password
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({ message: "Invalid Credentials...!" });
        }

        // 3. verify token
        const token = jsonwebtoken.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY, { expiresIn: "1h" });

        // 4. store user to session storage
        req.session.user = existingUser;

        res.status(201).json({ message:"User Logged in Successfully...!", user: existingUser, token: `Verified by token..! ${token}`, sessionStorage: req.session});
        console.log(req.session.user.name, 80)

    } catch (error) {
        res.status(500).json({message: "Something went wrong...!"});
    }
}

// [-----LOGIC: READ USERDATA-----]
export const getUser = async (req, res) => {
    if(req.params.id){
        //find user by id
        userDB.findById(req.params.id)
        .then(data => {
            if(!data){ return res.status(404).send({message: "Not found user with id " + req.params.id}); }
            else{ return res.status(200).json({message: "User Fetched Successfully...", user: data}); }
        })
        .catch(err => { return res.status(404).json({message: "Error retrieving user with id " + err.message}); })
    }else{
        //find all users
        userDB.find()
        .then(data => { return res.status(200).json({message: "All Users Fetched Successfully...", users: data}); })
        .catch(err => { return res.status(500).json({message: "Error occured while retrieving user information " + err.message}); })
    }
};

// [-----LOGIC: LOGOUT USER-----]
export const logoutUser = async (req, res) => {
    await req.session.destroy();
    res.send({ message: "User logged out!", sessionStorage: req.session })
}

// [-----LOGIC: UPDATE USER-----]
export const updateUser = (req, res) => {
    // console.log(req.file, 90);
    // console.log(req.body, 91);
    let imageValue = "";        
    if(!req.file){
        imageValue = req.body.image;
    }else{
        imageValue = req.file.filename;
    }
    const id = req.params.id;
    userDB.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
        image: req.file.filename,
    })
    .then(data => {
        if(!data){
            res.send("User not found");
        }else{
            res.status(201).json({ message:"User Updated Successfully...!", user: data });
        }
    })
    .catch( err => {
        res.send("Error while updating the user")
    })
};