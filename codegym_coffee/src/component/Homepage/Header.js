import React, { useEffect, useState } from 'react';
import '../../css/Homepage/header.css';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMediaQueryMatched, setIsMediaQueryMatched] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header");
            header.classList.toggle("sticky", window.scrollY > 0);
            setIsMenuOpen(false);
        };

        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleMediaQueryChange = (mediaQuery) => {
            setIsMediaQueryMatched(mediaQuery.matches);
        };

        handleMediaQueryChange(mediaQuery); // Kiểm tra trạng thái ban đầu của media query

        mediaQuery.addListener(handleMediaQueryChange); // Lắng nghe sự thay đổi của media query

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsMenuOpen(false); // Đóng menu khi kích thước màn hình thay đổi
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (!isMediaQueryMatched) {
            setIsMenuOpen(false);
        }
    }, [isMediaQueryMatched]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={isMenuOpen ? "open" : ""}>
            <a href="# " className="logo"><img src="/Homepage/logo2.png"/></a>
            <nav className="menu">
                <ul className={isMenuOpen ? "open" : ""}>
                    <li><a href="#">Bán hàng</a></li>
                    <li><a href="#">Hóa đơn</a></li>
                    <li><a href="#">Bài đăng</a></li>
                    <li><a href="#">Sản phẩm</a></li>
                    <li><a href="#">Phản hồi</a></li>
                    <li><a href="#">Thu nhập</a></li>
                    <li><a href="#">Quản lí nhân viên</a></li>
                </ul>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </nav>
        </header>
    );
};
