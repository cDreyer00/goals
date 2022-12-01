import "./style.scss"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { Button } from "../../components/input/Input"

export default function Goals() {

   const [user, setUser] = useState({});
   const [goals, setGoals] = useState([]);

   const navigate = useNavigate();

   useEffect(() => {
      const token = Cookies.get("token")

      if (!token) {
         toast.error("You must be logged in order to access this page")
         navigate("/");
         return;
      }

      // get user
      axios.get("/user/infos").then((res) => {
         setUser(res.data);
      }).catch((err) => {
         toast.error("An error has ocurred when trying catch informations, try again")
         navigate("/");
      })

      // get user goals
      axios.get("/user/goals").then((res) => {
         setGoals(res.data)
      }).catch((err) => {
         console.log(err)
      })

   }, [])

   return (
      <div className="goalsPage">
         <div className="goalsContainer">
            <h1>Goals</h1>
            <Button borderColor="yellow" content="Add a new goal" onClick={() => console.log("clicked")}/>
            <ul>
               {goals.map((goal) =>{
                  return(
                     <li key={goal.id}>
                        
                        {goal.title}<br/>
                        {goal.description}<br/>
                        {goal.value}<br/>
                        {goal.achievement_time}

                     </li>
                  )
               })}
            </ul>
         </div>
      </div>
   )
}