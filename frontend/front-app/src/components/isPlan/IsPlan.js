import axios from "axios";
import { useState, useEffect  } from "react";
import Questions from "../questions/Questions";

export const IsPlan = ({ children }) => {
  const [isPlanAdded, setIsPlanAdded] = useState(false);

  //it checks if there is any plan given
  useEffect(() => {
    axios.get('http://localhost:8080/api/yourplan/isPlan/' + localStorage.getItem("email"))
      .then((res) => {
        setIsPlanAdded(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); 
  
  useEffect(() => {
  }, [isPlanAdded]);

//it goes to childred page, if added
if (isPlanAdded) {
  return children;
}

//else generete new plan in questions
return <Questions />
};