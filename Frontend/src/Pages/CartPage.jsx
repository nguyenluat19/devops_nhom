import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Image } from 'antd';
import Layout from "../components/Layout/Layout";

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

    return (
        <Layout>
            <div className="container" style={{ marginTop: '130px' }}>
                <h3 className="mt-3">Giỏ hàng</h3>

                {/* If cart is empty */}
                {cart.length === 0 ? (
                    <div className="text-center">
                        <img
                            src="https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-cart.9cc0f897feb1585aec6c0902e.png"
                            alt="Giỏ hàng trống"
                            style={{ width: "45%", marginTop: "10px" }}
                        />
                        <button className="buttonCartPage">
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                                Quay về trang chủ
                            </Link>
                        </button>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-8">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr className="table-dark">
                                        <th>Ảnh sản phẩm</th>
                                        <th>Sản phẩm</th>
                                        <th>Chi tiết</th>
                                        <th>Giá</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((p) => (
                                        <tr key={p._id}>
                                            <td>
                                                <Image
                                                    src={p.image}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                            <td>{p.name}</td>
                                            <td>
                                                {p.description.length > 23
                                                    ? `${p.description.substring(0, 25)}...`
                                                    : p.description}
                                            </td>
                                            <td>{p.price.toLocaleString("vi-VN")} ₫</td>
                                            <td>
                                                <RiDeleteBin6Line
                                                    onClick={() => removeCartItem(p._id)}
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3}>
                                            <input
                                                type="text"
                                                placeholder="Mã ưu đãi"
                                                className="form-control d-inline"
                                                style={{ width: "200px", marginRight: "10px" }}
                                            />
                                            <button className="btn btn-warning">Áp dụng ưu đãi</button>
                                        </td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary">Cập nhật Giỏ hàng</button>
                                            <h6>Tổng tiền: {totalPrice()}</h6>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Summary & Checkout */}
                        <div className="col-md-4">
                            <h3>Tổng giỏ hàng</h3>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <div>
                                <p>Tổng phụ: {totalPrice()}</p>
                                <p><strong>Tổng cộng: {totalPrice()}</strong></p>
                            </div>

                            {/* Address & Checkout */}
                            {auth?.user?.address ? (
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => navigate("/dashboard/user/profile")}
                                >
                                    Cập nhật thông tin
                                </button>
                            ) : auth?.token ? (
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => navigate("/cart")}
                                >
                                    Cập nhật địa chỉ
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => navigate("/login", { state: "/cart" })}
                                >
                                    Đăng nhập để thanh toán
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CartPage;
