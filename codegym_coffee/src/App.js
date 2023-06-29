import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";
import {HomePage} from "./component/Homepage/HomePage";
import {EmployeeList} from "./component/employee/EmployeeList";


function App() {
  return (
      <>
            <Routes>
                {/*<Route path="/" element={<HomePage/>}></Route>*/}
                <Route path="/" element={<EmployeeList/>}/>
            </Routes>
      </>
  );
}

export default App;
