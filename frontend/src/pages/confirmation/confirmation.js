import "./style.scss"
import { Link, useParams, Navigate} from "react-router-dom";
import { Button } from "../../components/input/Input";
import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { toast } from "react-toastify";

export default function Confirmation() {

   // solicitar verificação da conta atravez do token recebido
   const { token } = useParams()

   useEffect(() => {
      api.get(`/confirmation/${token}`).then((res) => {
         toast.success("Account verified");         
      }).catch((err) => {
         toast.error("Account could not be verified");
      })
   }, [])
   
   return (<Navigate to="/"/>)
}