import postDB from "../models/postModel.js";

export const createPost = async (req, res) => {  
    // get data from client
    const {id, title} = req.body;
    try {
        if(!id || !title){
            return res.status(404).json({message: "All fields are required to be filled...!"});
        }
        // 1. post creation: save post data to backend
        const createPost = new postDB({
            id: id,
            title: title,
            image: req.file.filename,
        })
        createPost.save()

        res.status(201).json({message: "Post created successfully...!", post: createPost});

    } catch (err) { res.status(500).json({message:`Error while creating post! => ${err.message}`}) }
}

export const getPosts = async (req, res) => {  
    // get data from client
    if(req.params.id){
        //find fruit by id
        postDB.find( {id: req.params.id } )
        .then(data => {
            if(!data){ res.status(404).json({message: "Not found post with id " + req.params.id}) }
            else{ res.status(200).send({ message:"post data fetched successfully...!", post: data }) }
        })
        .catch(err => res.status(404).json({ message:"Error retrieving post with id...! " + req.params.id }))
    }else{
        //find all fruits
        postDB.find()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).json({ message:"Some error occurred while fetching fruits...!", error: err }))
    }
}