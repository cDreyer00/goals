import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/home";

function App() {   
   return (
      <div className="App">
         <Home/>
      </div>
   );
}


//how use axios

// {
//    const [users, setUsers] = useState([]);

//    useEffect(() => {
//       axios.get("/users")
//          .then((res) => {
//             setUsers(res.data)
//          })
//    }, [])
// }


export default App;
