import './App.css';
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {HomePage} from "./component/Homepage/HomePage";
import ChangePassword from "./component/account/ChangePassword";
import EmployeeInformation from "./component/employee/EmployeeInformation";


function App() {
  return (
          <Routes>
              {/*<Route path="/" element={<HomePage />}/>*/}
              {/*<Route path="/" element={<ChangePassword/>}/>*/}
              {<Route path="/" element={<EmployeeInformation/>}/> }
          </Routes>
  );
}

export default App;
