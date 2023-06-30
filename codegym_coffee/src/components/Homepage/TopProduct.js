import React, { useState } from 'react';
import "../../css/Homepage/TopProduct.css"

export const TopProduct = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isContentVisible, setIsContentVisible] = useState(false);

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    };

    const slides = [
        {
            id: 1,
            image: '/Homepage/img_1.jpg',
            title: 'Slide 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            image: '/Homepage/img_2.jpg',
            title: 'Slide 2',
            description: 'Praesent gravida mi et mauris sollicitudin ultricies.',
        },
        {
            id: 3,
            image: '/Homepage/img3.png',
            title: 'Slide 3',
            description: 'Sed vitae sapien vel diam tincidunt lacinia.',
        },
        {
            id: 4,
            image: '/Homepage/img1.png',
            title: 'Slide 3',
            description: 'Sed vitae sapien vel diam tincidunt lacinia.',
        },
        {
            id: 5,
            image: '/Homepage/product1.png',
            title: 'Slide 3',
            description: 'Sed vitae sapien vel diam tincidunt lacinia.',
        },
        {
            id: 6,
            image: '/Homepage/img_5.jpg',
            title: 'Slide 3',
            description: 'Sed vitae sapien vel diam tincidunt lacinia.',
        }
    ];

    const handleSlideClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="slide-container">
            <h1 className='h1_TopP'>
                <strong className="h1_strongP">BEST SELLER</strong>
            </h1>
            <div className="slide-wrapper">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => handleSlideClick(index)} // Xử lý sự kiện chạm vào hình ảnh
                    >
                        <img src={slide.image} alt={slide.title} />
                        <div className="slide-content">
                            <div className="div_slide_a" >
                                <a className="slide_a" ><span>Đặt món</span></a>
                            </div>
                            <h3 className="slide_h3">{slide.title}</h3>
                            <p className="slide_p">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
