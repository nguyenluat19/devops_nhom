import { Link, NavLink } from "react-router-dom";
import './Header.css';
import { GrSearch } from "react-icons/gr";
import { Badge } from 'antd';
import { SlHandbag } from "react-icons/sl";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';
import { FaCircleUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { AiTwotoneDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useCart } from "../../context/cart";
// import Search from "../Form/SearchInput";

const Header = () => {
    const [cart] = useCart()
    const [auth, setAuth] = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sliderTop, setSliderTop] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
        toast.success("Đăng xuất thành công");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScroll = () => {
        setSliderTop(window.scrollY > 50 ? -50 : 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <div className="slider-top" style={{ top: `${sliderTop}px` }}>
                <div className="slider-top-in">
                    <img className="anh-headerTop-a" src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Giao%20hang.svg" />
                    <img className="anh-headerTop-a" src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Thu%20cu.svg" />
                    <img className="anh-headerTop-a" src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Chinh%20hang.svg" />
                    <img className="anh-headerTop-a" src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Smember.svg" />
                </div>
            </div>
            <header className={`header-website ${sliderTop === 0 ? '' : 'header-fixed'}`}>
                <div className="container-website">
                    <div className="logo-website">
                        <Link to="/" className="logo-text">MyWebsite.com</Link>
                    </div>

                    <div className="search-bar-website">
                        <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                        <button type="submit"><GrSearch /></button>
                        {/* <Search /> */}
                    </div>

                    <div className={`actions-website ${isMenuOpen ? "open" : ""}`}>


                        <Badge count={totalQuantity} showZero className="badge-adjust" overflowCount={99}>
                            <NavLink to="/cart">
                                <SlHandbag className="icon-website" />
                            </NavLink>
                        </Badge>


                        {!auth.user ? (
                            <>
                                <Link to="/login" className="buttonHeader login-btn">Đăng nhập</Link>
                                <Link to="/register" className="buttonHeader register-btn">Đăng ký</Link>
                            </>
                        ) : (
                            <div className="nav-item dropdown position-relative">
                                <button
                                    className="btn btn-light rounded-circle p-2 d-flex align-items-center"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    data-bs-toggle="dropdown"
                                // style={{ border: "none", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                                >
                                    <FaCircleUser style={{ fontSize: '30px', color: '#333' }} />
                                </button>

                                {isDropdownOpen && (
                                    <motion.ul
                                        className="dropdown-menu show shadow-sm p-2"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: "50px",
                                            minWidth: "180px",
                                            borderRadius: "4px",
                                            background: "white"
                                        }}
                                    >
                                        <li className="dropdown-header text-muted text-center">
                                            {auth.user ? `👤 ${auth.user.name}` : "Tài khoản"}
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item d-flex align-items-center" to="/profile">
                                                <FaRegUser className="me-2" /> Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item d-flex align-items-center" to="/dashboard">
                                                <AiTwotoneDashboard className="me-2" /> Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={handleLogout}
                                                to="/login"
                                                className="dropdown-item d-flex align-items-center text-danger"
                                            >
                                                <FaSignOutAlt className="me-2" /> Logout
                                            </NavLink>
                                        </li>
                                    </motion.ul>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="menu-toggle" onClick={toggleMenu}>
                        <div className="menu-icon"></div>
                        <div className="menu-icon"></div>
                        <div className="menu-icon"></div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
