import Layout from "../components/Layout/Layout"
import styles from './styles/CartPage.module.css'
import { MdNavigateNext } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Image } from "antd";
import toast from "react-hot-toast";

const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    const totalPrice = () => {
        if (!cart || cart.length === 0) return "0 VND";
        try {
            let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            return total.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        } catch (error) {
            console.error("Error calculating total price:", error);
            return "0 VND";
        }
    };


    // Remove item from cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            if (index !== -1) {
                myCart.splice(index, 1);
                setCart(myCart);
                localStorage.setItem('cart', JSON.stringify(myCart));
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const handleVoucher = () => {
        toast.error("Chức năng đang được phát triển 🚀");
    }


    const handleCheckout = () => {
        if (auth?.token) {
            navigate("/thanh-toan", { state: { cart } });
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/login", { state: "/cart" });
        }
    };


    const handleLogin = () => {
        navigate("/login", { state: "/cart" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    return (
        <Layout title={'Giỏ hàng'}>
            <div className={styles.wrapGioHang}>
                <div className={styles.wrapInGioHang}>
                    <p style={{ fontSize: '15px' }}> <GoHome />Trang chủ <MdNavigateNext /> Giỏ hàng</p>
                    {cart.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <h2>Giỏ hàng trống</h2>
                            <img
                                src="https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-cart.9cc0f897feb1585aec6c0902e.png"
                                alt="Giỏ hàng trống"

                            />
                            <div style={{ marginBottom: '50px', marginTop: '20px' }}>
                                <Link to="/" className={styles.btnQuayVeTrangChu}>
                                    Quay về trang chủ
                                </Link>
                            </div>

                        </div>
                    ) : (
                        <div className={styles.InINWrapGioHang}>
                            <div className={styles.leftInINWrapGioHang}>
                                {cart.map((item) => (
                                    <div key={item._id} className={styles.productItemLeft}>
                                        <div className={styles.productImageLeft}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                className={styles.productImageInLeft}
                                            />
                                        </div>
                                        <div className={styles.productInfoLeft}>
                                            <div>
                                                <h4>{item.name.substring(0, 15)}</h4>
                                                <div>Màu: undefiled</div>
                                            </div>
                                            <div>{item.description.substring(0, 25)}...</div>
                                            <div    >Số lượng: {item.quantity}</div>
                                            <div style={{ color: '#FD475A', fontWeight: 'bold', fontSize: '14px' }}>
                                                {item.price ? (item.price * item.quantity).toLocaleString() : "0"}đ
                                            </div>
                                            <div className={styles.forcusLineThrough}>
                                                {item.priceGoc ? item.priceGoc.toLocaleString() : "0"}đ
                                            </div>

                                            <button
                                                className={styles.removeBtn}
                                                onClick={() => removeCartItem(item._id)}
                                            >
                                                <RiDeleteBin6Line /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className={styles.rightInINWrapGioHang}>
                                <h4 className={styles.h4TongGioHang}>
                                    <div style={{ padding: '5px' }}>Tổng giỏ hàng</div>
                                </h4>
                                <div className="text-center">Total | Checkout | Payment</div>
                                <div className={styles.nhapMaUuDai}>
                                    <input type="text" placeholder="Nhập mã ưu đãi" />
                                    <button onClick={() => handleVoucher()}>Áp dụng</button>
                                </div>
                                <div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA}>Tổng sản phẩm : </div>
                                        <div >
                                            {totalQuantity} SP
                                        </div>
                                    </div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA}>Tổng tiền: </div>
                                        <div >
                                            {totalPrice()}
                                        </div>
                                    </div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA} >
                                            Tổng khuyến mãi:
                                        </div>
                                        <div>200.000đ</div>
                                    </div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA}>
                                            Áp dụng Voucher:
                                        </div>
                                        <div>
                                            0đ
                                        </div>
                                    </div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA}>
                                            Cần thanh toán:
                                        </div>
                                        <div className={styles.totalB}>  {(
                                            parseInt(totalPrice().replace(/[^\d]/g, ''), 10) - 200000
                                        ).toLocaleString("vi-VN")}đ</div>
                                    </div>
                                </div>
                                {auth?.token ? (
                                    <button className={styles.btnXacNhanDon} onClick={handleCheckout}>
                                        Xác nhận đơn
                                    </button>
                                ) : (
                                    <button className={styles.btnVuiLongDangNhap}
                                        onClick={() => handleLogin()}
                                    >
                                        Vui lòng đăng nhập
                                    </button>
                                )}

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </Layout>
    )
}

export default CartPage
