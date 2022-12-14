import "./style.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../../components/input/Input"
import api from "../../services/api.js";
import { toast } from "react-toastify";

export default function Register() {

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   function handleSubmit(e) {
      e.preventDefault();

      api.post("/user", {
         name: name,
         email: email,
         password: password

      }).then((res) => {
         toast.success("email for confirmation sent")
      }).catch((err) => {
         toast.error(err.response.data)
      })
   }

   return (
      <div className="registerContainer">
         <h1>New Account</h1>
         <form onSubmit={(e) => handleSubmit(e)}>
            <Input type="text" placeHolder="name..." onChange={(e) => setName(e.target.value)} />
            <Input type="text" placeHolder="email..." onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeHolder="password..." onChange={(e) => setPassword(e.target.value)} />
            <Button content={"Create Account"} borderColor={"green"} />
         </form>

         <Link to="/">
            <Button content={"Access Account"} borderColor={"CornflowerBlue"} />
         </Link>
      </div>
   )
}