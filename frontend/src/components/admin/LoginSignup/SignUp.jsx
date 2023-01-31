import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser(formData);
  };

  const signUpUser = async (data) => {
    const res = await axios.post(`http://localhost:7000/users/signup`, data)
      .then(res => { alert(res.data.message); navigate("/admin/dashboard"); })
      .catch(err => { alert(err.response.data.message);});
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
                  <h2>SIGNUP</h2>
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3" method="post" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control form-control-lg" name="name" placeholder="Name" onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control form-control-lg" name="email" placeholder="Email" onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control form-control-lg" name="password" placeholder="Password" onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input type="tel" className="form-control form-control-lg" name="mobile" placeholder="Mobile Number" onChange={handleInputChange} required />
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/admin" className="text-primary">Login</Link>
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
