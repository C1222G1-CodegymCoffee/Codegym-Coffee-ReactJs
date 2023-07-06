import React, {useEffect, useState} from 'react';
import "../../css/Homepage/TopProduct.css"
import * as topProductService from "../../service/Homepage/HomePageService"
import {Link} from "react-router-dom";

export const TopProduct = () => {
    const [topProduct, setTopProduct] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        displayTopProduct()
    }, [])
    const displayTopProduct = async () => {
        const res = await topProductService.getTopProduct()
        setTopProduct(res)

    }
    const handleSlideClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="slide-container">
            <h1 className='h1_TopP'>
                <strong className="h1_strongP">MÓN BÁN CHẠY</strong>
            </h1>
            <div className="slide-wrapper">
                {topProduct?.map((product, index) => (
                    <div
                        key={product.idProduct}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => handleSlideClick(index)} // Xử lý sự kiện chạm vào hình ảnh
                    >
                        <img src={product.image} className="slide_img"/>
                        <div className="slide-content">
                            <div className="div_slide_a">
                                <Link to='/menu' className="slide_a"><span>Đặt món</span></Link>
                            </div>
                            <h3 className="slide_h3">{product.nameProduct}</h3>
                            <p className="slide_p">{product.price} đ</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};