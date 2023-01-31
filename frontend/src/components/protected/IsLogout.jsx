import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IsLogout(props) {
    const {Component} = props;
    const navigate = useNavigate();
  
    useEffect(() => {
      var valid_admin = localStorage.getItem("user");
      if(valid_admin){
        navigate("/adminmain/dashboard")
      }
    })
    
  return (
    <div>
    <Component />
    </div>
  )
}
