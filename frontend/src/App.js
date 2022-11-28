import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./pages/login/login";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/register/register";

function App() {
   return (
      <div className="App">
         <ToastContainer autoClose={3000} theme="dark" transition={Flip}/>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Login />}/>
               <Route path="/register" element={<Register />}/>
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
