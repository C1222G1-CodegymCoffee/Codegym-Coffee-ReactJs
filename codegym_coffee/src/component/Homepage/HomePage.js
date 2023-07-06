import {Header} from "./Header";
import {BackgroundHeader} from "./BackgroundHeader";
import React from "react";
import {TopProduct} from "./TopProduct";
import {Footer} from "./Footer";
import {News} from "./News";
import "../../css/Homepage/HomePage.css"
import {NewProduct} from "./NewProduct";
import {ListNews} from "../News/ListNews";


export const HomePage = () => {
    return (
        <>

            <BackgroundHeader/>
            <section id="topProduct"><TopProduct/></section>
            <section id="newProduct"><NewProduct/></section>
            <ListNews/>
        </>

    )
}