import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";
import {HomePage} from "./component/Homepage/HomePage";
import { CreateProduct } from './component/product/CreateProduct';
import { EditProduct } from './component/product/EditProduct';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
      <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/" element={<Header/>}></Route>
                <Route path="/createProduct" element={<CreateProduct/>}></Route>
                <Route path="/editProduct/:idProduct" element={<EditProduct/>}></Route>
            </Routes>
            <ToastContainer/>
      </>
  );
}

export default App;

