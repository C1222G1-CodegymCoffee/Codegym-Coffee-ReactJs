import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {HomePage} from "./component/Homepage/HomePage";
import {Sale} from "./component/Sale/Sale";


function App() {
  return (
      <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/sale" element={<Sale/>}></Route>
            </Routes>
      </>
  );
}

export default App;
