import './App.css';
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {HomePage} from "./component/Homepage/HomePage";
import ChangePassword from "./component/account/ChangePassword";
import EmployeeInformation from "./component/employee/EmployeeInformation";
import {HomePage} from "./component/Homepage/HomePage";
import {Sale} from "./component/Sale/Sale";
import {ListFeedback} from "./component/feedback/ListFeedback";
import {EmployeeList} from "./component/employee/EmployeeList";
import {AddEmployee} from "./component/employee/AddEmployee";
import List from "./component/bill/List";

import {DisplayMenu} from "./component/Menu/DisplayMenu";
import {Menu} from "./component/Menu/Menu";
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";
import {HomePage} from "./component/Homepage/HomePage";
import Login from "./component/login/Login";
import ResetPassword from "./component/login/ResetPassword";
import NewsCreate from "./component/News/NewsCreate";

import { ToastContainer } from "react-toastify";


import Example from "./component/Statistical/BarChart";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/sale" element={<Sale/>}></Route>
                <Route path="/feedback" element={<ListFeedback/>}></Route>
                <Route path="/employee" element={<EmployeeList/>}></Route>
                <Route path="/employee_create" element={<AddEmployee/>}></Route>
                <Route path="/bill" element={<List/>}></Route>
                <Route path="/account/change-password" element={<ChangePassword/>}/>
                <Route path="/menu" element={<DisplayMenu/>}></Route>
                <Route path="/reset_password" element={<ResetPassword/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/createNews" element={<NewsCreate/>}/>
                <Route path="/statistical" element={<Example/>}/>
            </Routes>
          <ToastContainer />
      </>
  );
}

export default App;
