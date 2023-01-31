import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errmsg, setErrmsg] = useState();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
      setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const finalFormData = new FormData();
      finalFormData.append('name', formData.name)
      finalFormData.append('email', formData.email)
      finalFormData.append('password', formData.password)
      finalFormData.append('city', formData.city)
      finalFormData.append('mobile', formData.mobile)
      finalFormData.append('image', formData.image)
      // console.log(formData,27)
      signUpUser(finalFormData);
    };

    const signUpUser = async (data) => {
        const res = await axios.post(`http://localhost:7000/api/user/signup`, data)
        .then(res => {navigate(`../home/${res.data.user._id}`);})
        .catch(err => {setErrmsg(err.response.data.message)});
    };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="text-center my-3">Signup</h1>
            <form action="" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Enter Name</label>
                <input type="text" className="form-control" name="name" placeholder="Enter your name" onChange={handleInputChange} />
                <small className="text-danger">{errmsg}</small>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" placeholder="Enter your email" onChange={handleInputChange} />
                <small className="text-danger">{errmsg}</small>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Enter password</label>
                <input type="password" className="form-control" name="password" placeholder="Enter your password" onChange={handleInputChange} />
                <small className="text-danger">{errmsg}</small>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Enter mobile number</label>
                <input type="tel" className="form-control" name="mobile" placeholder="Enter your mobile number" onChange={handleInputChange} />
                <small className="text-danger">{errmsg}</small>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Enter city</label>
                <input type="text" className="form-control" name="city" placeholder="Enter your city" onChange={handleInputChange} />
                <small className="text-danger">{errmsg}</small>
              </div>
              <div className="mb-3">
              <label htmlFor="image" className="form-label">Select Image</label>
              <input type="file" className="form-control" name="image" onChange={handleImage} required/>
              </div>
              <div className="d-flex flex-column">
                <button className="btn btn-dark fw-bold" type="submit">Signup</button>
                <Link to="/" className="text-dark text-decoration-none" >Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
