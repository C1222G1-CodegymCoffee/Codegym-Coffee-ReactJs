import React from 'react';
import '../../css/Homepage/footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Về chúng tôi</h3>
                        <p>KHU NGHỈ DƯỠNG ĐẲNG CẤP THẾ GIỚI, FURAMA ĐÀ NẴNG, NỔI TIẾNG LÀ KHU NGHỈ DƯỠNG ẨM THỰC TẠI VIỆT NAM.</p>
                    </div>
                    <div className="col-md-6">
                        <h3>Liên hệ</h3>
                        <p>103 – 105 Đường Võ Nguyên Giáp</p>
                        <p>Phường Khuê Mỹ, Quận Ngũ hành Sơn, Tp. Đà Nẵng, Việt Nam</p>
                        <p>Email: reservation@furamavietnam.com</p>
                        <p>Điện thoại: 84-236-3847 333/888</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
