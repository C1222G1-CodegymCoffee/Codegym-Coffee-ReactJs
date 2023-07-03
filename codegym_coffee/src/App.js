import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";
import {HomePage} from "./component/Homepage/HomePage";
import Login from "./component/login/Login";
import ResetPassword from "./component/login/ResetPassword";


function App() {
  return (
      <>
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/reset_password" element={<ResetPassword/>}></Route>
            </Routes>
      </>
  );
}

export default App;
