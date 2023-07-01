import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {HomePage} from "./component/Homepage/HomePage";
import NewsCreate from "./component/News/NewsCreate";

import { ToastContainer } from "react-toastify";


import Example from "./component/Statistical/BarChart";
function App() {
  return (
      <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/createNews" element={<NewsCreate/>}/>
                <Route path="/statistical" element={<Example/>}/>
            </Routes>
          <ToastContainer />
      </>
  );
}

export default App;
