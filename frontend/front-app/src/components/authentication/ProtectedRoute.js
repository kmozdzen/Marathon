import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("token");
  const [tokenExpired, setTokenExpired] = useState(false);

  if (token != null) {
    axios.post('http://localhost:8080/api/auth/isToken/' + localStorage.getItem("token"))
    .then((res) =>
    {
      if(res.data.message == "not valid")
     {
      setTokenExpired(true);
     }
     else if(res.data.message == "valid"){
      setTokenExpired(false);
     }
    }, fail => {
    console.error(fail); // Error!
  });
  }

  if(token != null && !tokenExpired){
    return children
  }
  return <Navigate to="/login" />;
  };