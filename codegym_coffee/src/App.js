import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {HomePage} from "./component/Homepage/HomePage";
import {Sale} from "./component/Sale/Sale";
import {ListFeedback} from "./component/feedback/ListFeedback";


function App() {
  return (
      <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/sale" element={<Sale/>}></Route>
                <Route path="/feedback" element={<ListFeedback/>}></Route>
            </Routes>
      </>
  );
}

export default App;
