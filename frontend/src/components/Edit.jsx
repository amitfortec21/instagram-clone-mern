import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    // if(!formData.image.name){
    //   setFormData({ ...formData, image: formData.image });
    // }
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = new FormData();
    finalFormData.append("name", formData.name);
    finalFormData.append("email", formData.email);
    finalFormData.append("mobile", formData.mobile);
    finalFormData.append("city", formData.city);
    finalFormData.append("image", formData.image);
    editUser(finalFormData);
  };

  const editUser = async (data) => {
    await axios.put(`http://localhost:7000/api/user/${id}`, data)
      .then((res) => { localStorage.setItem("user", JSON.stringify({ id: formData._id, name: formData.name, email: formData.email, mobile: formData.mobile, city: formData.city, password: formData.password, image: formData.image.name })) })
      .catch((err) => { console.log(err.message) });
      navigate("/home");
  };
  // console.log(formData.image, 55)

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center my-3">Edit</h1>
          {/* Form Code Start */}
          <form
            method="post"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" placeholder="Your Name" onChange={handleInputChange} defaultValue={formData.name} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email </label>
              <input type="email" className="form-control" name="email" placeholder="Your Email" onChange={handleInputChange} defaultValue={formData.email} />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input type="number" className="form-control" name="mobile" placeholder="Your Mobile Number" onChange={handleInputChange} defaultValue={formData.mobile} />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" name="city" placeholder="Your City" onChange={handleInputChange} defaultValue={formData.city} />
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="image" className="form-label">Select Image</label>
                  {/* <input type="hidden" className="form-control" name="image" /> */}
                  <input type="file" className="form-control" name="image" onChange={handleImage} defaultValue={formData.image} required />
                </div>
                {/* <div className="col-md-3">
                  <img src={`http://localhost:7000/uploads/${formData.image}`} alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} required />
                </div> */}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
          {/* Form Code End */}
        </div>
      </div>
    </div>
  );
}
