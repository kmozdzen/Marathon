import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const IsPlan = ({ children }) => {
    const [IsPlanAdded, setIsPlanAdded] = useState(false);
    
    axios.post('http://localhost:8080/api/your-plan/is-added' + localStorage.getItem("token"))
        .then((res) =>
        {
        if(res.data.isPlan){
            setIsPlanAdded(true);
        }
        }, fail => {
        console.error(fail); // Error!
    });

  if(IsPlanAdded){
    return children
  }

  return <Navigate to="/questions" />;
};