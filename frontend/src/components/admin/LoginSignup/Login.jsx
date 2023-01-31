import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();    
        logInUser(formData);
    };
    const logInUser = async (data) => {
        const res = await axios.post(`http://localhost:7000/api/user`, data)
        .then(res => { alert(res.data.message); localStorage.setItem("user", JSON.stringify(res.data)); navigate("/adminmain/dashboard"); })
        .catch(err => { alert(err.response.data.message); });
    };
    
    return (
        <>
            {/* <div className="main-panel"> */}
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5 bg-white border-light rounded">
                                <div className="brand-logo">
                                    {/* <img src="../../images/logo.svg" alt="logo" /> */}
                                    <h2>LOGIN</h2>
                                </div>
                                <h4>Hello! let's get started</h4>
                                <h6 className="font-weight-light">Sign in to continue.</h6>
                                <form className="pt-3" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-lg" name="email" placeholder="Username" onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg" name="password" placeholder="Password" onChange={handleInputChange} required autoComplete="on"/>
                                    </div>
                                    <div className="mt-3">
                                        <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                                    </div>
                                    <div className="my-2 d-flex justify-content-between align-items-center">
                                        <a href="/" className="auth-link text-black">Forgot password?</a>
                                    </div>
                                    <div className="mb-2">
                                        <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                                            <i className="ti-facebook mr-2"></i>Connect using facebook
                                        </button>
                                    </div>
                                    <div className="text-center mt-4 font-weight-light">
                                        Don't have an account? <Link to="../signup" className="text-primary">Create</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

