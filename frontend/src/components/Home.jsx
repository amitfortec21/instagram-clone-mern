import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({id:"", name: "", email: "", mobile: "", city: "", image: ""});
  
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user')))
    if(!localStorage.getItem('user')){ navigate("/") }
  },[]);

  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="bg-light rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between">
                <Link to="/home" className="text-decoration-none"><p className="text-primary fs-5 mt-3">Home</p></Link>
                <button type="button" className="btn btn-outline-primary ms-1" onClick={() => { localStorage.removeItem('user'); navigate("/"); }}>Logout</button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src={`http://localhost:7000/uploads/${userData.image}`} alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} />
                  <h5 className="my-3">{userData.name}</h5>
                  <Link to={`/edit/${userData._id}`} className="btn btn-primary">Edit Profile</Link> <hr />
                  <div className="d-flex justify-content-around text-decoration-none">
                      <Link to={`posts/${userData._id}`} className="text-primary text-decoration-none">My Posts</Link>
                      <Link to="allposts" className="text-primary text-decoration-none">All Posts</Link>
                      <Link to="savedposts" className="text-primary text-decoration-none">Saved Posts</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                  <div className="col-sm-12">
                      <p className="text-primary text-uppercase fs-3 my-3 text-center">Welcome {userData.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.mobile}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">City</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
