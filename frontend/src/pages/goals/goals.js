import "./style.scss"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

export default function Goals() {

   const [user, setUser] = useState({});

   const navigate = useNavigate();

   async function fetchData(param) {
      return await param();
   }

   useEffect(() => {
      const token = Cookies.get("token")

      if (!token) {
         toast.error("You must be logged in order to access this page")
         navigate("/");
         return;
      }

      axios.get("/user/infos").then((res) => {
         setUser(res.data);
      }).catch((err) => {
         toast.error("An error has ocurred when trying catch informations, try again")
         navigate("/");
      })

   }, [])

   console.log(user)

   return (
      <div className="goalsPage">
         <div className="goalsContainer">
            <h1>Goals</h1>
            <ul>
               <l1>goal 1</l1>
            </ul>
         </div>
      </div>
   )
}