import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Posts() {
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!localStorage.getItem('user')) { navigate("/") }
    axios.get(`http://localhost:7000/api/post/${id}`)
      .then((res) => { setPostData(res.data.post) })
      .catch((err) => { console.log(err.message) })
  }, []);
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
