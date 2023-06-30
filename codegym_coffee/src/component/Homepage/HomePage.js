import {Header} from "./Header";
import {BackgroundHeader} from "./BackgroundHeader";
import React from "react";
import {TopProduct} from "./TopProduct";
import {Footer} from "./Footer";


export const HomePage = () =>{
    return(
        <>
            <Header/>
            <BackgroundHeader/>
            <section id="topProduct"><TopProduct/></section>
            <Footer/>
        </>

    )
}