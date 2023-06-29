import React from "react";
import "../../css/Homepage/BackgroundHeader.css";

export const BackgroundHeader = () => {
    return (
        <div className="container">
            <div className="banner_image ">
                <img src="/Homepage/img_01.png" alt="Banner Image" className="body_wrap" />
            </div>
            <div className="content">
                <h1>Đây là nội dung bên trái</h1>
            </div>
        </div>
    );
};
