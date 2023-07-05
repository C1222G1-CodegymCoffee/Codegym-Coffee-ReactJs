import React from "react";
import {Carousel} from "react-bootstrap";
import '../../css/Homepage/New.css';

export const News = () => {
    return (
        <div className="container container_news">
            {/*<h1 className="h1ForService">Dịch vụ</h1>*/}
            <Carousel interval={10000} controls>
                <Carousel.Item>
                    <div className="row">
                        <div className="col-lg-6">
                            <img
                                className="d-block w-100 foodImg"
                                src="/Homepage/news1.jpg"
                                alt="Image 1"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h1 className="titleService">Tin tức 1</h1>
                            <p className="pService">
                                Hạt cà phê có thể mang đến một loạt các hương vị và độ đậm khác
                                nhau tùy thuộc vào nguồn gốc và phương pháp chế biến. Một số loại
                                hạt cà phê nổi tiếng bao gồm Arabica và Robusta, và mỗi loại có
                                những đặc điểm riêng biệt trong việc tạo ra cà phê có hương vị
                                đặc trưng.
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="row">
                        <div className="col-lg-6">
                            <img
                                className="d-block w-100 foodImg"
                                src="/Homepage/news2.jpg"
                                alt="Image 2"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h1 className="titleService">TIn tức 2</h1>
                            <p className="pService">
                                Hạt cà phê rang sẽ có màu nâu và có thể được sử dụng để nghiền và
                                pha cà phê. Quá trình nghiền hạt cà phê thường được thực hiện
                                trước khi cà phê được pha, để tạo ra bột cà phê mịn hoặc thô tùy
                                theo sở thích cá nhân và phương pháp pha cà phê sử dụng.
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="row">
                        <div className="col-lg-6">
                            <img
                                className="d-block w-100 foodImg"
                                src="/Homepage/news3.jpg"
                                alt="Image 3"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h1 className="titleService">Tíc tức 3</h1>
                            <p className="pService">
                                Quá trình sản xuất hạt cà phê bắt đầu bằng việc thu hoạch quả cà
                                phê từ cây. Quả cà phê sau đó được xử lý để tách hạt cà phê ra
                                khỏi vỏ và các lớp bên ngoài khác. Sau khi tách được hạt cà
                                phê, chúng cần được rang để tạo ra mùi hương và hương vị đặc
                                trưng của cà phê.
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};
