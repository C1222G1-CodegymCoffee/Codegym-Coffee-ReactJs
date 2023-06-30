import './App.css';
import React from "react";
import {Routes, Route} from 'react-router-dom'
import {CreateFeedback} from "./component/feedback/CreateFeedback";
import {HomePage} from "./component/Homepage/HomePage";
import {ListNews} from "./component/news/ListNews";


function App() {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage/>}></Route>
            <Route path={"/public/feedback"} element={<CreateFeedback/>}></Route>
            <Route path={"/public/news"} element={<ListNews/>}></Route>
            <Route path={"/public/detail/news:id"} element={<ListNews/>}></Route>
        </Routes>
    );
}

export default App;
