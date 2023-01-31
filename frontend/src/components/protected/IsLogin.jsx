import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IsLogin(props) {
    const {Component} = props;
    const navigate = useNavigate();
  
    useEffect(() => {
      var valid_admin = localStorage.getItem("user");
      if(!valid_admin){
        navigate("/admin")
      }
    })
    
  return (
    <div>
    <Component />
    </div>
  )
}
