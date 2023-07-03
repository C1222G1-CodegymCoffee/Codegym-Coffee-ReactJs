import {Header} from "./Header";
import {BackgroundHeader} from "./BackgroundHeader";
import React from "react";
import {ListNews} from "../news/ListNews";


export const HomePage = () =>{
    return(
        <>
            <Header/>
            <BackgroundHeader/>
            <ListNews/>
        </>

    )
}