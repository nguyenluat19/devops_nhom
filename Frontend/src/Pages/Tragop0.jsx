
import { MdOutlineLocalShipping } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import Layout from "../components/Layout/Layout";
import { GoHome } from "react-icons/go";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FaCheck } from "react-icons/fa6";
import styles from './styles/DetailPage.module.css';
import { useAuth } from "../context/auth";
import { MdArrowBackIosNew } from "react-icons/md";
import { useCart } from "../context/cart";


const API_URL = import.meta.env.VITE_API;

const Tragop0 = () => {
    const { id } = useParams();
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/v1/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        if (id) {
            getProduct();
        }
    }, [id]);

    if (loading) return <Spinner />;

    const handleBack = () => {

        // window.location.href = "/";
        navigate("/")

    }


    const gioHang = () => {
        let updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingProductIndex >= 0) {

            updatedCart[existingProductIndex].quantity += 1;
        } else {
            const newProduct = { ...product, id: product.id || new Date().getTime(), quantity: 1 };
            updatedCart.push(newProduct);
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        navigate('/cart')
    }
    const hanldeMuaNgay = () => {
        gioHang(product._id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <Layout title={"Trả góp 0% lãi suất"}>
            <div className="container" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ marginTop: "140px" }}>
                    <div className="row">
                        <div className="col-md-12">
                            <p style={{ fontSize: '14px' }}>
                                <GoHome />Trang chủ <MdNavigateNext /> Trả góp <MdNavigateNext />
                                <strong>{product?.name}</strong>
                            </p>
                            <h4 style={{ fontWeight: 'bold' }} >Trả góp sản phẩm {product?.name} - Chính hãng</h4>
                            {/* <h4 className="text-danger text-center">Sản phẩm {product?.name} - Chính hãng </h4> */}
                            {/* <p className="text-muted text-center">Chỉ cần có CMND/CCCD và hộ khẩu là bạn có thể mua hàng trả góp 0% lãi suất.</p> */}
                        </div>
                    </div>

                    {product && (
                        <div className="row mt-4">
                            <div className="col-md-4">
                                <div className="card">
                                    <img src={product.image} className="card-img-top" alt={product.name} />
                                    {/* <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Giá sản phẩm: {product.price.toLocaleString()}đ</p>
                                        <p className="card-text text-danger">Giá trả góp từ: {(product.price / 12).toLocaleString()}đ/tháng</p>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 style={{ fontWeight: 'bold' }} className="card-title">Thông tin sản phẩm</h5>
                                        <div>
                                            <p className="card-text  mt-3">Tên sản phẩm: {product.name}</p>
                                            <p className="card-text">Giá sản phẩm: {product.price.toLocaleString()}đ</p>
                                            <p className="card-text text-danger" >Giá gốc: {product.priceGoc.toLocaleString()}đ</p>
                                        </div>
                                        <div className={styles.WrapChoiceColor}>
                                            <p style={{ fontWeight: '700', fontSize: '14px' }} className="mt-3">Lựa chọn màu</p>
                                            <div className={styles.choiceColor}>
                                                <img src={product.image} />
                                                <div className={styles.undefinedMau}>
                                                    <p>Màu undefined</p>
                                                    <p style={{ fontSize: '13px', color: '#FD475A' }}>{product.price.toLocaleString()}đ</p>
                                                    <div>
                                                        <FaCheck />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.freeShip}>
                                            <MdOutlineLocalShipping style={{ fontSize: '20px' }} /> Miễn phí giao hàng cho đơn hàng toàn quốc
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 style={{ fontWeight: 'bold' }} className="mt-4">1. Thông tin trả góp </h5>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td >Giá sản phẩm</td>
                                            <td>{product.price.toLocaleString()}đ</td>
                                        </tr>
                                        <tr>
                                            <td>Trả trước</td>
                                            <td>{(product.price * 0.3).toLocaleString()}đ (30%)</td>
                                        </tr>
                                        <tr>
                                            <td>Khoản còn lại</td>
                                            <td>{(product.price * 0.7).toLocaleString()}đ (70%)</td>
                                        </tr>
                                        <tr>
                                            <td>Kỳ hạn</td>
                                            <td>6 - 12 tháng</td>
                                        </tr>
                                        <tr>
                                            <td>Lãi suất</td>
                                            <td>8%/tháng</td>
                                        </tr>
                                        <tr>
                                            <td>Ước tính góp/tháng (6 tháng)</td>
                                            <td>
                                                {(
                                                    (product.price * 0.7) / 6 +
                                                    (product.price * 0.7 * 0.08)
                                                ).toLocaleString()}đ

                                                { }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Giấy tờ cần có</td>
                                            <td>CCCD + Hộ khẩu</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    )}

                    {/* <div className="row mt-4">
                        <div className="col-md-12 text-center">
                            <img src="/images/tragop.jpg" alt="Trả góp 0%" className="img-fluid" />
                        </div>
                    </div> */}
                </div>
                <div>
                    <h5 style={{ fontWeight: 'bold' }} className="mt-4">2. Hướng dẫn trả góp 0%</h5>
                    <div className={styles.wrapGuide}>
                        <p style={{ fontSize: '14px' }} className="mt-3">Bước 1: Chọn sản phẩm bạn muốn mua trả góp</p>
                        <p style={{ fontSize: '14px' }}>Bước 2: Điền thông tin cá nhân và chọn hình thức thanh toán</p>
                        <p style={{ fontSize: '14px' }}>Bước 3: Nhân viên sẽ liên hệ với bạn để xác nhận đơn hàng</p>
                        <p style={{ fontSize: '14px' }}>Bước 4: Nhận hàng và thanh toán theo kỳ hạn đã chọn</p>
                    </div>
                </div>
                <div >
                    <h5 style={{ fontWeight: 'bold' }} className="mt-4">3. Thông tin người mua</h5>
                    <div className={styles.wrapInfoUser}>
                        <input type="text" placeholder={auth.user.name} />
                        <input type="text" placeholder={auth.user.phone} />
                        <input type="text" placeholder={auth.user.email} />
                    </div>
                    <input className={styles.inputAdress} type="text" placeholder={auth.user.address} />
                    <textarea className={styles.textArea} name="" id="" style={{ width: "100%", height: "100px" }}>
                        Ghi chú:

                    </textarea>
                    <div className={styles.wrapBtn}>
                        <button className={styles.btnQuayLai} onClick={handleBack}><MdArrowBackIosNew /> Quay lại</button>
                        <button className={styles.btnDatHang} onClick={() => hanldeMuaNgay()}>Tiếp tục</button>
                    </div>
                    <div className={styles.wrapNote}>
                        <p style={{ fontSize: '14px' }} className="mt-3">Lưu ý: Đơn hàng sẽ được giao trong vòng 3-5 ngày làm việc</p>
                        <p style={{ fontSize: '14px' }}>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua số điện thoại: 1900 1234</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Tragop0;