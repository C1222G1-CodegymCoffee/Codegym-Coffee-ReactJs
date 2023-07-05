import React from "react";
import "../../css/Homepage/BackgroundHeader.css";

export const BackgroundHeader = () => {
    return (
        <div id="bgHeader">
            <div className="container_bgHeader">
                <div className="banner_image ">
                    <img src="/Homepage/img_01.png" alt="Banner Image"  />
                </div>
                <div className="content_bgHeader">
                    <h1 className='h1_content'>
                        <strong className="h1_strong">CODEGYM</strong> <span className='span_content'>COFFEE</span>
                    </h1>
                    <a className="btn_a_top btn_primary_a text_uppercase_a" href="#topProduct">Menu</a>
                </div>
            </div>
        </div>
    );
};