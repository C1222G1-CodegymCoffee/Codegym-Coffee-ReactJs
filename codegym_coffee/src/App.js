import './App.css';
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {CreateFeedback} from "./component/feedback/CreateFeedback";
import {HomePage} from "./component/Homepage/HomePage";
import {ListNews} from "./component/news/ListNews";
import {DetailNews} from "./component/news/DetailNews";


function App() {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage/>}></Route>
            <Route path={"/public/feedback"} element={<CreateFeedback/>}></Route>
            <Route path={"/detail-news/:id"} element={<DetailNews/>}></Route>
        </Routes>
    );
}

export default App;
