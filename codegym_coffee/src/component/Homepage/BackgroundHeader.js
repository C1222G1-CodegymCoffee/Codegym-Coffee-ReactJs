import React from "react";
import "../../css/Homepage/BackgroundHeader.css";
import {ListNews} from "../news/ListNews";

export const BackgroundHeader = () => {
    return (
        <div>
            <div className="container">
                <div className="banner_image">
                    <img src="/Homepage/img_01.png" alt="Banner Image"/>
                </div>
                <div className="content">
                    <h1>Đây là nội dung bên trái</h1>
                </div>
            </div>
        </div>
    );
};
