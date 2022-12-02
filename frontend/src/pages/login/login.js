import "./style.scss"
import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Input } from "../../components/input/Input"

import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault()

        axios.post("/login", {
            email: email,
            password: password,

        }).then(({ data }) => {
            toast.success("Welcome " + data.name)
            navigate("/goals");

        }).catch(({ response }) => {
            if (response.status == 403) {
                toast.warning(response.data)
            }
            else {
                toast.error(response.data)
            }
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