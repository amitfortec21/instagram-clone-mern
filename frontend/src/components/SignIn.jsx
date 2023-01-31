import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [errmsg, setErrmsg] = useState();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser(formData);
    };

    useEffect(() => {
        if(localStorage.getItem('user')){ navigate('/home') }
      }, []);

    const signInUser = async (data) => {
        await axios.post(`http://localhost:7000/api/user/`, data)
        .then(res => { localStorage.setItem("user", JSON.stringify(res.data.sessionStorage.user)); alert(res.data.message);  navigate("/home");})
        .catch(err => { setErrmsg(err.response.data.message) });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center my-3">Login</h1>
                        <form action="" method="post" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email" onChange={handleInputChange} />
                                <small className="text-danger">{errmsg}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Enter password</label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Enter your password" onChange={handleInputChange} />
                                <small className="text-danger">{errmsg}</small>
                            </div>
                            <div className="d-flex flex-column">
                                <button className="btn btn-dark fw-bold" type="submit">Login</button>
                                <Link to="/signup" className="text-dark text-decoration-none">Signup</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
