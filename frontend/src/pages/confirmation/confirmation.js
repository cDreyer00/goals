import "./style.scss"
import { Link } from "react-router-dom";

export default function Confirmation(){

   // solicitar verificação da conta atravez do token recebido

   return(
      <div>
         <h1>Account verified successfully</h1>
         <Link to="/">Access Account</Link>
      </div>
   )
}