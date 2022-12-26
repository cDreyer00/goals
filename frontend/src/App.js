import React, { useState, useEffect } from "react";
import Login from "./pages/login/login";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/register/register";
import Goals from "./pages/goals/goals";
import Confirmation from "./pages/confirmation/confirmation";
import { IconContext } from "react-icons";

function App() {
    return (
        <div className="App">
            <ToastContainer autoClose={3000} theme="dark" transition={Flip} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/goals" element={<Goals />} />

                    <Route path="/confirmation/:token" element={<Confirmation />} />
                </Routes>
            </BrowserRouter>

            <p style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                color: 'gray',
                fontSize: 'medium'
            }}>
                v0.1.1
            </p>
        </div>
    );
}

export default App;
