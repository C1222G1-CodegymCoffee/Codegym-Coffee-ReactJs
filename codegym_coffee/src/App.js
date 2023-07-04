import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";
import {HomePage} from "./component/Homepage/HomePage";
import {EmployeeList} from "./component/employee/EmployeeList";
import {AddEmployee} from "./component/employee/AddEmployee";


function App() {
  return (
      <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/employee" element={<EmployeeList/>}/>
                <Route path="/employee_create" element={<AddEmployee/>}/>
            </Routes>
      </>
  );
}

export default App;
