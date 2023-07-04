import './App.css';
import {Header} from "./component/Homepage/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {BackgroundHeader} from "./component/Homepage/BackgroundHeader";
import {HomePage} from "./component/Homepage/HomePage";
import {DisplayMenu} from "./component/Menu/DisplayMenu";
import {Menu} from "./component/Menu/Menu";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/menu" element={<DisplayMenu/>}></Route>
            </Routes>
        </>
    );
}

export default App;
