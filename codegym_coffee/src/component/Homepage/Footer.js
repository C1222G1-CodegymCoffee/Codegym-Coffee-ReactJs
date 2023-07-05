import React from 'react';
import '../../css/Homepage/footer.css';

export const Footer = () => {
    return (
        <div id="footer">
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Lời cảm ơn</h3>
                            <p>Với Codegym Coffee của chúng tôi, chúng tôi hy vọng mang lại cho bạn trải nghiệm cà phê tuyệt vời nhất, và chúng tôi luôn sẵn sàng phục vụ bạn một cách tận tâm và chuyên nghiệp.
                                Cảm ơn bạn đã lựa chọn Coffee Shop của chúng tôi. Hãy đến và tận hưởng niềm đam mê cà phê với chúng tôi!</p>
                        </div>
                        <div className="col-md-6">
                            <h3>Liên hệ</h3>
                            <p>Số 280 đường Trần Hưng Đạo</p>
                            <p>Phường An Hải Tây, quận Sơn Trà, ĐN</p>
                            <p>Email: codegymcoffee@gmail.com</p>
                            <p>Điện thoại: 0123456789</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};