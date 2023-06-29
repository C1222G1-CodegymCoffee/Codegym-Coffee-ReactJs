import './App.css';
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {HomePage} from "./component/Homepage/HomePage";
import {DisplayMenu} from "./component/Menu/DisplayMenu";


function App() {
  return (
      <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/menu" element={<DisplayMenu/>}></Route>
            </Routes>
      </>
  );
}

export default App;
