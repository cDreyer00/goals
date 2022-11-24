import { Input } from "../components/Input"
import "./styles/home.scss"

export default function Home() {
   return (
      <div className="homeContainer">
         <h1>Get it Done</h1>
         <form>
            <Input/>
            <Input/>
         </form>
      </div>
   )
}