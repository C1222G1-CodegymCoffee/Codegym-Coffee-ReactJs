import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";
import {HomePage} from "./component/Homepage/HomePage";


function App() {
  return (
      <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
            </Routes>
      </>
  );
}

export default App;
