import React, {useEffect, useState} from "react";
import "../../css/Homepage/header.css";
import {Link} from "react-router-dom";

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

    const logout = () => {
        sessionStorage.removeItem("TOKEN");
        sessionStorage.removeItem("USERNAME");
        sessionStorage.removeItem("ROLES");
        window.location.href = '/';
    };

    return (
        <header className={isMenuOpen ? "open" : ""}>
            <Link to="/" className="logo">
                <img src="/Homepage/logo.png" alt={""}/>
            </Link>
            <nav className="menu">
                <ul className={isMenuOpen ? "open" : ""}>
                    {sessionStorage.getItem("ROLES") === "ROLE_ADMIN" && (
                        <>
                            <li>
                                <Link to="/sale">Bán hàng</Link>
                            </li>
                            <li>
                                <Link to="/bill">Hóa đơn</Link>
                            </li>
                            <li>
                                <Link to="/news">Bài đăng</Link>
                            </li>
                            <li>
                                <Link to="/menu">Sản phẩm</Link>
                            </li>
                            <li>
                                <Link to="/feedback">Phản hồi</Link>
                            </li>
                            <li>
                                <Link to="/statistical">Thu nhập</Link>
                            </li>
                            <li>
                                <Link to="/employee">Quản lí nhân viên</Link>
                            </li>
                            <li>
                                <Link to="/profile">{sessionStorage.getItem("USERNAME")}</Link>
                            </li>
                            <li>
                                <Link onClick={() => logout()}>Đăng xuất</Link>
                            </li>
                        </>
                    )}

                    {sessionStorage.getItem("ROLES") === "ROLE_STAFF" && (
                        <>
                            <li>
                                <Link to="/sale">Bán hàng</Link>
                            </li>
                            <li>
                                <Link to="/news">Bài đăng</Link>
                            </li>
                            <li>
                                <Link to="/profile">{sessionStorage.getItem("USERNAME")}</Link>
                            </li>
                            <li>
                                <Link onClick={() => logout()}>Đăng xuất</Link>
                            </li>
                        </>
                    )}
                    {!sessionStorage.getItem("TOKEN") && (
                        <>
                            <li>
                                <Link to="/menu">Sản phẩm</Link>
                            </li>
                            <li>
                                <Link to="/login">Đăng nhập</Link>
                            </li>
                        </>
                    )}
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
