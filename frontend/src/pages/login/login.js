import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Input } from "../../components/Input"
import "./style.scss"

import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

export default function Login() {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   function onSubmit(e) {
      e.preventDefault()


      axios.post("/login", {
         email: email,
         password: password,
      }).then(({ data }) => {
         toast.success("Welcome " + data.name)
      }).catch(({ response }) => {
         toast.error(response.data)
      })

   }

   return (
      <div className="loginContainer">
         <h1>Get it Done</h1>
         <form onSubmit={(e) => onSubmit(e)}>
            <Input type={"text"} placeHolder={"email..."} onChange={(e) => setEmail(e.target.value)} />
            <Input type={"password"} placeHolder={"password..."} onChange={(e) => setPassword(e.target.value)} />
            <Button content={"Access"} borderColor={"green"} />
         </form>

         <Link to="/register">
            <Button content={"Create account"} borderColor={"CornflowerBlue"} />
         </Link>
      </div>
   )
}