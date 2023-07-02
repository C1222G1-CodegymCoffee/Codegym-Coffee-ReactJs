import {Header} from "./Header";
import {BackgroundHeader} from "./BackgroundHeader";
import React from "react";
import {TopProduct} from "./TopProduct";
import {Footer} from "./Footer";
import {News} from "./News";
import "../../css/Homepage/HomePage.css"


export const HomePage = () =>{
    return(
        <>
            <Header/>
            <BackgroundHeader/>
            <section id="topProduct"><TopProduct/></section>
            <News/>
            <Footer/>
        </>

    )
}