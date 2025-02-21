import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import styles from './styles/DetailPage.module.css';
import { MdNavigateNext } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { BsCoin } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuCrown } from "react-icons/lu";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";
import { TbCircleNumber4Filled } from "react-icons/tb";
import { TbCircleNumber5Filled } from "react-icons/tb";
import { GoShieldCheck } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import { BsBox } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import Spinner from "../components/Spinner";
import { IoChevronDownSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const DetailPage = () => {
    const { id } = useParams();
    const [cart, setCart] = useCart();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newProducts, setNewProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:3000/api/v1/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setSelectedImage(response.data.image);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/products/SpMoi');
                setNewProducts(response.data.latestProducts);
            } catch (error) {
                console.error('Error fetching new products:', error);
            }
        };
        fetchNewProducts();
    }, []);

    if (!product) return <Spinner />;

    const handleDetail = (id) => {
        if (!id) {
            console.error("Lỗi: ID sản phẩm không hợp lệ!");
            return;
        } else {
            console.log("Detail product with ID:", id);
            navigate(`/detail/${id}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const unMainImages = [
        product.image,
        "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/12/13/a16-den-4.png",
        "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/06/24/15-pro-max-spec-5.png",
        "https://cdn.hoanghamobile.com/i/preview-h-V2/Uploads/2024/06/25/oppo-reno12-f-5g-7.png"
    ];

    const handleSubmit = () => {
        toast.error('Chức năng đang được phát triển!');
    }

    const addToCart = () => {
        let updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingProductIndex >= 0) {
            // Nếu sản phẩm đã có trong giỏ, tăng số lượng
            updatedCart[existingProductIndex].quantity += 1;
        } else {
            // Nếu sản phẩm chưa có trong giỏ, thêm mới
            const newProduct = { ...product, id: product.id || new Date().getTime(), quantity: 1 };
            updatedCart.push(newProduct);
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success('Thêm sản phẩm thành công!');
    };

    return (
        <Layout title={'chi tiet'}>
            <div className={styles.containerDetailPage}>
                <div className={styles.wrapDetailPage}>
                    <p style={{ fontSize: '14px' }}> <GoHome />Trang chủ <MdNavigateNext /> Chi tiết <MdNavigateNext /> <strong>Sản phẩm {product.name}</strong></p>
                    <h4 style={{ fontWeight: 'bold' }}>{product.name}</h4>
                    <div className={styles.wrapInDetailPage}>
                        <div className={styles.leftDetail}>
                            <div className={styles.mainImage}>
                                <img src={selectedImage} alt={product.name} />
                            </div>
                            <div className={styles.thumbnailContainer}>
                                {unMainImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index}`}
                                        className={styles.thumbnail}
                                        onClick={() => setSelectedImage(img)}
                                    />
                                ))}
                            </div>
                            <div className={styles.leftDetailWrapBox}>
                                <div>
                                    <BsBox className={styles.leftDetailWrapBoxIcon} /> Miễn phí vận chuyển toàn quốc
                                </div>
                                <div>
                                    <GoShieldCheck className={styles.leftDetailWrapBoxIcon} /> Bảo hành 13 tháng
                                </div>
                                <div>
                                    <FaRegStar className={styles.leftDetailWrapBoxIcon} /> Lỗi 1 đổi 1 trong vòng 30 ngày
                                </div>
                                <div>
                                    <MdAddChart className={styles.leftDetailWrapBoxIcon} /> Giá đã bao gồm VAT
                                </div>
                            </div>
                            <div className={styles.informationProductLeftDetail}>
                                <div className={styles.informationProductLeftDetailOne}>
                                    <HiOutlineClipboardDocumentList className={styles.informationProductLeftDetailOneIcon} /> THÔNG TIN SẢN PHẨM
                                </div>
                                <div className={styles.informationProductLeftDetailIn}>
                                    <div className={styles.informationProductLeftDetailInIn}>
                                        <h6>Nội dung chính</h6>
                                        <div style={{ marginBottom: '2px' }}>
                                            <div>Thông số kỹ thuật của điện thoại {product.name} (4+4GB/64GB) </div>
                                            <div>Đánh giá điện thoại {product.name}: </div>
                                            <div> - Thiết kế: Comming soon</div>
                                            <div> - Màn hình: Comming soon</div>
                                            <div> - Chip xử lý: Comming soon</div>
                                            <div> - Dung lượng pin: Comming soon</div>
                                            <div> - Camera của {product.name}: Comming soon</div>
                                            <div>Điện thoại {product.description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.settingProductLeftDetail}>
                                <div className={styles.settingProductLeftDetailOne}>
                                    <IoSettingsOutline className={styles.settingProductLeftDetailOneIcon} /> THÔNG SỐ KỸ THUẬT
                                </div>
                                <div className={styles.settingProductLeftDetailIn}>
                                    <div className={styles.settingProductLeftDetailInIn}>
                                        <div >
                                            <div className={styles.settingDetailA}><strong>Tần số quét (Hz):</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailB}><strong>Kích thước màn hình: </strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Công nghệ màn hình:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailB}><strong>Độ phân giải:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Độ sáng màn hình:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailB}><strong>Kiểu màn hình:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Độ phân giải camera:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailB}><strong>Tính năng camera:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Camera trước:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailB}><strong>Camera sau:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Đèn Flash: </strong>  Có</div>
                                            <div className={styles.settingDetailB}><strong>Vi xử lý:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Tốc độ CPU:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailB}><strong >xử lý đồ họa (GPU):</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Bộ nhớ trong:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailB}><strong>Thẻ nhớ ngoài:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Số khe SIM:</strong>  2 Nano SIM</div>
                                            <div className={styles.settingDetailB}><strong>Cảm biến:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Bluetooth:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailB}><strong>Cổng kết nối/sạc:</strong>  Sắp ra mắt</div>
                                            <div className={styles.settingDetailA}><strong>Jack tai nghe:</strong> Type-C</div>
                                            <div className={styles.settingDetailB}><strong>Kết Nối NFC: </strong>  Có</div>
                                            <div className={styles.settingDetailA}><strong>Kháng nước, kháng bụi: </strong>  IP68</div>
                                            <div className={styles.settingDetailB}><strong>Bảo mật sinh trắc học: </strong>  Mở khoá khuôn mặt</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightDetail}>
                            <div className={styles.giaDetail}>
                                <div className={styles.giaSKU}>
                                    <p>Giá: <strong style={{ color: '#FD475A', fontWeight: '700', fontSize: '20px' }}>{product.price.toLocaleString()}đ</strong></p>
                                    <p className={styles.pgiaGoc}>{product.priceGoc.toLocaleString()}đ</p>
                                </div>
                                <div className={styles.sku}>
                                    <p>SKU: <strong>KM1312LC</strong></p>
                                </div>
                            </div>
                            <div className={styles.WrapChoiceColor}>
                                <p style={{ fontWeight: '700', fontSize: '14px' }}>Lựa chọn màu</p>
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
                            <div className={styles.uuDaiMemBerWrap}>
                                <div className={styles.uuDaiMemberIn}>
                                    <div className={styles.memberLeft}>
                                        <span className={styles.leftDanhRiengA} >Dành riêng cho TranChinh member</span>
                                        <div className={styles.leftDanhRiengB}>{(product.price * 0.8).toLocaleString()}đ</div>
                                        <div >
                                            <span className={styles.truHaiMuoiPTA} style={{ marginRight: '10px' }}>{product.price.toLocaleString()}đ</span>
                                            <span className={styles.truHaiMuoiPTB}>-20%</span>
                                        </div>
                                        <div className={styles.diemThuong}>
                                            <p><BsCoin /> +25,000 điểm thưởng</p>
                                        </div>
                                    </div>
                                    <div className={styles.memberRight}>
                                        <div>Ưu đãi trả góp (*)</div>
                                        <span>517,917đ/tháng</span>
                                        <p>(Kỳ hạn 6th/trả trước 50%)</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.allButtonAdd}>
                                <div className={styles.twoButtonFist}>
                                    <button className={styles.twoButtonFistA}>
                                        <strong>MUA NGAY</strong>
                                        <div>(Giao tận nhà hoặc nhận tại cửa hàng)</div>
                                    </button>
                                    <button className={styles.twoButtonFistB} onClick={addToCart}>
                                        <strong><AiOutlineShoppingCart /></strong>
                                        <div>Thêm giỏ hàng</div>
                                    </button>
                                </div>
                                <div className={styles.twoButtonSecond}>
                                    <button className={styles.twoButtonSecondA} onClick={() => handleSubmit()}>
                                        <strong>Trả góp 0%</strong>
                                        <div>0 phí - 0 trả trước</div>
                                    </button>
                                    <button className={styles.twoButtonSecondB} onClick={() => handleSubmit()}>
                                        <strong>Trả góp qua thẻ</strong>
                                        <div>(Visa, Mastercard, JCB)</div>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.uuDaiTranChinh}>
                                <div>
                                    <h3 ><LuCrown className={styles.iconUuDaiTranChinh} /> ƯU ĐÃI TRANCHINH</h3>
                                </div>
                                <div className={styles.wrapInUuDaiTranChinh}>
                                    <div >
                                        <TbCircleNumber1Filled className={styles.iconUuDaiTranChinha} /> Tích thêm 8,000 cho các hạng thành viên <strong>(Khám phá ngay)</strong>
                                    </div>
                                    <div>
                                        <TbCircleNumber2Filled className={styles.iconUuDaiTranChinha} /> Giảm thêm tới 25,000 cho Hoàng Hà Members <strong>(Khám phá ngay)</strong>
                                    </div>
                                    <div>
                                        <TbCircleNumber3Filled className={styles.iconUuDaiTranChinha} /> Ưu đãi trả góp 0% qua Shinhan Finance <strong>(Xem chi tiết)</strong>
                                    </div>
                                    <div>
                                        <TbCircleNumber4Filled className={styles.iconUuDaiTranChinha} /> Mở thẻ HSBC - Hoàn tiền tới 2 triệu đồng <strong>(Xem chi tiết)</strong>
                                    </div>
                                    <div>
                                        <TbCircleNumber5Filled className={styles.iconUuDaiTranChinha} /> Giảm đến 150.000đ khi thanh toán qua Muadee <strong>(Xem chi tiết)</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.sanPhamMoi}>
                        <div style={{ color: 'black', marginTop: '5px', fontWeight: 'bold', fontSize: '20px' }}>SẢN PHẨM MỚI</div>
                        <div className={styles.wrapProductCartSpMoi}>
                            {Array.isArray(newProducts) && newProducts.map((product, index) => (
                                <div key={index} className={styles.productCartSpMoi} >
                                    <div onClick={() => handleDetail(product._id)}>
                                        <img src={product.image} alt={product.name} className={styles.imageProductCartSpMoi} />
                                    </div>
                                    <h6 style={{ fontWeight: '600', fontSize: '13px', color: '#4b4b4b', cursor: 'pointer' }}>{product.name}</h6>
                                    <div className={styles.flexGiaHome}>
                                        <div className={styles.giaHomeFlex}>{product.price.toLocaleString()}đ</div>
                                        <div className={styles.giaGocHomeFlex}>{product.priceGoc.toLocaleString()}đ</div>
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#4b4b4b' }}>{product.description.substring(0, 27)}...</p>
                                    <div >
                                        <p style={{ fontSize: '13px', color: '#FC521D', cursor: 'pointer', fontWeight: 'bold' }}><IoChevronDownSharp /> Các ưu đãi khác</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DetailPage;