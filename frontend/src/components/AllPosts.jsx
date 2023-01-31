import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AllPosts() {
    const [postData, setPostData] = useState([]);
    // const [userData, setUserData] = useState([]);
    const [postBy, setPostBy] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) { navigate("/") }
        axios.get(`http://localhost:7000/api/post/`)
          .then((res) => { setPostData(res.data)})
          .catch((err) => { console.log(err.message) })
    }, []);

    const getUserName = (id) => {
        axios.get(`http://localhost:7000/api/user/${id}`)
          .then((res) => { setPostBy(res.data.user.name);})
          .catch((err) => { console.log(err) })
        return <> <p className="my-3 text-muted">Posted By: {postBy} </p> </>
    }
    
  return (
    <>
    <section style={{ backgroundColor: "#eee" }}>
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="bg-light rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between">
                <Link to="/home" className="text-decoration-none"><p className="text-primary fs-5 mt-3">Home</p></Link>
                <button type="button" className="btn btn-outline-primary ms-1" onClick={() => { navigate("/home/createpost") }}>Create a new post</button>
                <button type="button" className="btn btn-outline-primary ms-1" onClick={() => { localStorage.removeItem('user'); navigate("/"); } }>Logout</button>
              </div>
            </div>
          </div>

          <div className="row">
            {
              postData.map((item, index) => {
                return (
                  <div className="col-lg-4" key={index}>
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <img src={`http://localhost:7000/uploads/${item.image}`} alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px", height: "150px" }} />
                        <h5 className="my-3">{item.title}</h5>
                        <p className="my-3 text-muted">User Id: {`${item.id}`} </p>

                        { getUserName("63d778ae36789562c4b67123") }
                        {/* { getUserName("63d7782c36789562c4b6710e") } */}
                        
                        <div className="d-flex justify-content-around mb-2">
                          <button type="button" className="btn btn-primary" onClick={() => { }}>Save Post</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}
