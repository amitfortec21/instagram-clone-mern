import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({id: "", title: "", image: ""});
    const [userData, setUserData] = useState({_id: ""});
    const [errmsg, setErrmsg] = useState("");

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user')))
        if (!localStorage.getItem('user')) { navigate("/") }
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalFormData = new FormData();
        finalFormData.append('id', userData._id)
        finalFormData.append('title', formData.title)
        finalFormData.append('image', formData.image)        
        console.log(formData, 32);
        createPost(finalFormData);
    };

    const createPost = async (data) => {
        const res = await axios.post(`http://localhost:7000/api/post/create`, data)
        .then(res => {console.log(res.data); alert("post created"); navigate(`/home/posts/${userData._id}`)})
        .catch(err => {setErrmsg(err.response)});
    };

    const logout = () => { localStorage.removeItem('user'); navigate("/"); }
    return (
        <>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bg-light rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between">
                                <p className="text-primary fs-5 mt-3">Home</p>
                                <button type="button" className="btn btn-outline-primary ms-1" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="card col-md-6 mx-auto">
                            <h1 className="text-center my-3">Create Post</h1>
                            <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Post title</label>
                                    <input type="text" className="form-control" name="title" id="title" placeholder="Enter your post title" onChange={handleInputChange} />
                                    <small className="text-danger">{errmsg}</small>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Select Image</label>
                                    <input type="file" className="form-control" name="image" onChange={handleImage} required />
                                </div>
                                <div className="d-flex flex-column mb-3">
                                    <button className="btn btn-dark fw-bold" type="submit">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
