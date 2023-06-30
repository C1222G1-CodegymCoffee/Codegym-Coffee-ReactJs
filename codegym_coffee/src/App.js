import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";
import {HomePage} from "./component/Homepage/HomePage";
import { CreateProduct } from './component/Homepage/product/CreateProduct';
import { EditProduct } from './component/Homepage/product/EditProduct';


function App() {
  return (
      <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/" element={<Header/>}></Route>
                <Route path="/createProduct" element={<CreateProduct/>}></Route>
                {/* <Route path="/editProduct/:id" element={<EditProduct/>}></Route> */}

            </Routes>
      </>
  );
}

export default App;

