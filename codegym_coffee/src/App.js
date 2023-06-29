import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";


function App() {
  return (
      <>
         <Header/>
         <BackgroundHeader/>
      </>
  );
}

export default App;
