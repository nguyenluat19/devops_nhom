import { GoHome } from "react-icons/go";
import Layout from "../components/Layout/Layout";
import styles from "./styles/CBDatHang.module.css";
import { MdNavigateNext } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { Radio } from "antd";
import { BsCash } from "react-icons/bs";
import toast from "react-hot-toast";

const CBDatHang = () => {
    const location = useLocation();
    const cart = location.state?.cart ?? [];
    const [auth] = useAuth();
    const [valueName, setValueName] = useState(auth.user.name);
    const [valueAddress, setValueAddress] = useState(auth.user.address)
    // const [valuePhone, setValuePhone] = useState(auth.user.phone)
    const [valuePhone, setValuePhone] = useState(auth.user.phone);



    const [shippingMethod, setShippingMethod] = useState("store");
    const totalPrice = () => {
        if (cart.length === 0) return "0 VND";
        try {
            let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            return total.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
        } catch (error) {
            console.error("Error calculating total price:", error);
            return "0 VND";
        }
    };

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);


    const handleClick = () => {
        toast.error('Chức năng đang được phát triển 🚀')
    }
    return (
        <Layout>
            <div className={styles.containerCBDatHang}>
                <div className={styles.inContainerCBDatHang}>
                    <p style={{ fontSize: "15px" }}>
                        <GoHome /> Trang chủ <MdNavigateNext /> Thông tin
                    </p>
                    {cart.length > 0 ? (
                        <div className={styles.InINWrapGioHang}>
                            <div className={styles.topInINWrapGioHang}>
                                {cart.map((item) => (
                                    <div key={item._id} className={styles.productItemLeft}>
                                        <div className={styles.productImageLeft}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className={styles.productImageInLeft}
                                                width={90}
                                            />
                                            <div className={styles.tenSanPahm}>
                                                <div className={styles.a}>Sản phẩm: {item.name}</div>
                                                <div>Màu: Undefiled</div>
                                            </div>
                                        </div>
                                        <div className={styles.productInfoLeft}>
                                            <div className={styles.removeBtn}>Số lượng: {item.quantity}</div>
                                            <div style={{ color: "#FD475A", fontWeight: "bold", fontSize: "14px" }}>
                                                {(item.price * item.quantity).toLocaleString()}đ
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className={styles.tongTienTamTinh}>
                                    <strong>Tổng tiền tạm tính ({totalQuantity})sp</strong>
                                    <div> {totalPrice()}</div>
                                </div>
                                <div className={styles.tongTienSauKM}>
                                    <strong>Tổng tiền ({totalQuantity})sp sau KM</strong>
                                    <div>{(
                                        parseInt(totalPrice().replace(/[^\d]/g, ''), 10) - 200000
                                    ).toLocaleString("vi-VN")} đ
                                    </div>

                                </div>

                            </div>
                            <div className={styles.shippingInfo}>
                                <h6>THÔNG TIN NHẬN HÀNG</h6>
                                <div className={styles.shippingMethod}>
                                    <button
                                        className={shippingMethod === "store" ? styles.active : ""}
                                        onClick={() => setShippingMethod("store")}
                                    >
                                        Giao hàng tận nơi
                                    </button>
                                    <button
                                        className={shippingMethod === "home" ? styles.active : ""}
                                        onClick={() => setShippingMethod("home")}
                                    >
                                        Nhận tại cửa hàng
                                    </button>
                                </div>
                                {shippingMethod === "home" && (
                                    <div className={styles.storePickup}>
                                        <label>Tỉnh / Thành phố</label>
                                        <select>
                                            <option>Đà Nẵng</option>
                                            <option>Hà Nội</option>
                                            <option>Hồ Chí Minh</option>
                                            <option>Thừa Thiên Huế</option>
                                            <option>Quảng Trị</option>
                                            <option>Quảng Nam</option>
                                            <option></option>
                                        </select>
                                        <label>Chọn quận/huyện</label>
                                        <select>
                                            <option>Chọn quận/huyện</option>
                                        </select>
                                        <label>Chọn địa chỉ cửa hàng</label>
                                        <select>
                                            <option>Chọn địa chỉ cửa hàng</option>
                                        </select>
                                        <label>Ghi chú khác (nếu có)</label>
                                        <input type="text" placeholder="Nhập ghi chú..." />
                                    </div>
                                )}
                                {shippingMethod === "store" && (
                                    <div className={styles.homeDelivery}>
                                        <label>Tên người nhận</label>
                                        <input
                                            type="text"
                                            value={valueName}
                                            onChange={(e) => setValueName(e.target.value)}

                                        />
                                        <label>Số điện thoại</label>
                                        <input
                                            type="text"
                                            value={valuePhone}
                                            onChange={(e) => setValuePhone(e.target.value)}
                                        />
                                        <label>Địa chỉ</label>
                                        <input
                                            type="text"
                                            value={valueAddress}
                                            onChange={(e) => setValueAddress(e.target.value)}
                                        />
                                        <label>Địa chỉ cụ thể</label>
                                        <input type="text" placeholder="Nhập địa chỉ cụ thể..." />
                                        <label>Ghi chú khác (nếu có)</label>
                                        <input type="text" placeholder="Nhập ghi chú..." />
                                    </div>
                                )}
                            </div>
                            <div className={styles.chossePayment}>

                                <h6 className="mt-3">PHƯƠNG THỨC THANH TOÁN</h6>
                                <div className={styles.inChossePayment}>
                                    <Radio.Group
                                        className={styles.RadioGroup}
                                    // onChange={(e) => setRadio(e.target.value)}
                                    >

                                        <span><Radio > <BsCash style={{ fontSize: '23px', color: '#2e5986' }} /> Thanh toán bằng tiền mặt</Radio></span>
                                        <Radio ><img width={50} src="https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg" />Thanh toán bằng VNPay</Radio>

                                        <Radio > <img width={20} src="https://homepage.momocdn.net/fileuploads/svg/momo-file-240411162904.svg" /> Thanh toán bằng momo</Radio>

                                        <Radio >Thanh toán bằng online</Radio>


                                    </Radio.Group>

                                    <button onClick={() => handleClick()}>Tiếp tục</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Không có sản phẩm trong giỏ hàng.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CBDatHang;
