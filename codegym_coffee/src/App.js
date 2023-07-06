import './App.css';
import React from "react";
import {Route, Routes} from 'react-router-dom'
import {HomePage} from "./component/Homepage/HomePage";
import ChangePassword from "./component/account/ChangePassword";
import {Sale} from "./component/Sale/Sale";
import {ListFeedback} from "./component/feedback/ListFeedback";
import {EmployeeList} from "./component/employee/EmployeeList";
import {AddEmployee} from "./component/employee/AddEmployee";
import List from "./component/bill/List";

import {DisplayMenu} from "./component/Menu/DisplayMenu";
import Login from "./component/login/Login";
import ResetPassword from "./component/login/ResetPassword";
import NewsCreate from "./component/News/NewsCreate";
import {CreateProduct} from './component/product/CreateProduct';
import {EditProduct} from './component/product/EditProduct';
import {ToastContainer} from 'react-toastify';


import Example from "./component/Statistical/BarChart";
import {ListNews} from "./component/News/ListNews";
import {Header} from "./component/Homepage/Header";
import {CreateFeedback} from "./component/feedback/CreateFeedback";
import EmployeeInformation from "./component/employee/EmployeeInformation";
import Page403 from './component/login/Page403';
import {Footer} from "./component/Homepage/Footer";
import {BillDT} from "./component/bill/BillDT";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/sale" element={<Sale/>}></Route>
                <Route path="/feedback" element={<ListFeedback/>}></Route>
                <Route path="/createFeedback" element={<CreateFeedback/>}></Route>
                <Route path="/employee" element={<EmployeeList/>}></Route>
                <Route path="/employee_create" element={<AddEmployee/>}></Route>
                <Route path="/bill" element={<List/>}></Route>
                <Route path="/account/change-password" element={<ChangePassword/>}/>
                <Route path="/menu" element={<DisplayMenu/>}></Route>
                <Route path="/reset_password" element={<ResetPassword/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/news" element={<NewsCreate/>}></Route>
                <Route path="/createNews" element={<NewsCreate/>}/>
                <Route path="/statistical" element={<Example/>}/>
                <Route path="/createProduct" element={<CreateProduct/>}></Route>
                <Route path="/editProduct/:idProduct" element={<EditProduct/>}></Route>
                <Route path="/profile" element={<EmployeeInformation />} />
                <Route path="/accessDenied" element={<Page403 />} />
                <Route path="/billDetail" element={<BillDT />} />
            </Routes>
            <Footer/>
          <ToastContainer />
      </>
  );
}

export default App;

