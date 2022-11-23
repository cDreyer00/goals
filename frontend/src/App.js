import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      axios.get("/users")
         .then((res) => {
            setUsers(res.data)
         })
   }, [])

   return (
      <div className="App">
         {users.map((item)=>{
            return(
               <h1>{item.email}</h1>
            )
         })}
      </div>
   );
}

export default App;
