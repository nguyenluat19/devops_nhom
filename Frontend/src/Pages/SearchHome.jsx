import { useEffect, useState } from 'react';
import styles from './styles/searchHome.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import { GoHome } from 'react-icons/go';
import { MdNavigateNext, MdOutlineFilterAlt } from 'react-icons/md';
import { Radio } from 'antd';
import { Prices } from '../components/Prices';
import { IoArrowBackOutline } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";
// import Loading from '../Admin/pagesAdmin/Loading'
import Spinner from '../components/Spinner';
const API_URL = import.meta.env.VITE_API;


const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword');
    const [radio, setRadio] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/search?keyword=${keyword}`);
                setProducts(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Lỗi khi tìm kiếm sản phẩm:', error);
                setProducts([]); // Đảm bảo state được cập nhật khi có lỗi
            }
        };
        fetchProducts();
    }, [keyword]);

    useEffect(() => {
        if (!radio || radio.length === 0) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => {
                const price = parseFloat(product.price);
                return price >= radio[0] && price <= radio[1];
            });
            setFilteredProducts(filtered);
        }
    }, [radio, products]);

    const handleBuyNow = (id) => {
        if (!id) {
            console.error("Lỗi: ID sản phẩm không hợp lệ!");
            return;
        }
        navigate(`/detail/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        navigate('/')
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <Layout title="Tìm kiếm">
            <div className={styles.searchContainer}>
                <div className={styles.wrapSearchContainer}>
                    <p style={{ fontSize: '15px' }}>
                        <GoHome /> Trang chủ <MdNavigateNext /> Tìm kiếm
                    </p>

                    {filteredProducts.length === 0 ? (
                        <p style={{
                            textAlign: 'center',
                            fontSize: '25px',
                            marginTop: '120px',
                            marginBottom: '290px',
                            color: 'red'
                        }}>
                            Không tìm thấy sản phẩm nào phù hợp 😢
                        </p>
                    ) : (
                        <div className={styles.inSearchContainer}>
                            <div className={styles.searchLeftContainer}>
                                <div className={styles.wrapSearchLeftContainer}>
                                    <h5 className={styles.FilterTitle}>
                                        <MdOutlineFilterAlt /> Lọc theo giá SP
                                    </h5>
                                    <hr />
                                    <div className={styles.wrapDanhMucLeft}>
                                        <Radio.Group
                                            className={styles.RadioGroup}
                                            onChange={(e) => setRadio(e.target.value)}
                                        >
                                            {Prices.map((p) => (
                                                <div className={styles.RadioItem} key={p._id}>
                                                    <Radio value={p.array}>{p.name}</Radio>
                                                </div>
                                            ))}
                                        </Radio.Group>
                                        <button className={styles.ReloadButton} onClick={() => window.location.reload()}>
                                            Reload page
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.searchRightContainer}>
                                <div className={styles.iconQuayLai}>
                                    <h4>Kết quả tìm kiếm cho: <strong>{keyword}</strong></h4>
                                    <div className={styles.inIconQUayLai} onClick={() => handleBack()}><IoArrowBackOutline /> Quay lại trang chủ</div>
                                </div>
                                <div className={styles.productList}>
                                    {filteredProducts.map((product) => (
                                        <div key={product._id} className={styles.productCart} >
                                            <p className={styles.discountHomeProduct}>Giảm {product.discount}%</p>
                                            <div onClick={() => handleBuyNow(product._id)}>
                                                <img src={product.image} alt={product.name} className={styles.productImageHome} />
                                            </div>
                                            <h6 onClick={() => handleBuyNow(product._id)} style={{ fontWeight: '600', fontSize: '13px', color: '#4b4b4b', cursor: 'pointer' }}>{product.name}</h6>
                                            {/* <p>{product.description}</p> */}
                                            <div className={styles.flexGiaHome}>
                                                <p className={styles.giaHomeFlex}>{product.price.toLocaleString()}đ</p>
                                                <p className={styles.giaGocHomeFlex}>{product.priceGoc.toLocaleString()}đ</p>
                                            </div>
                                            {/* <p>{product.description.subString(0, 22)}...</p> */}
                                            {/* <p style={{ fontSize: '13px', color: '#4b4b4b' }}>{product.description.substring(0, 27)}...</p> */}
                                            {/* <div>
                                                                                <span>TranChinh member giảm lên tới 20%</span>
                                                                                </div> */}
                                            <div className={styles.flexKhuyenMai}>
                                                <p className={styles.inKM}>KM</p>
                                                <p>Nhiều gói ưu đãi </p>
                                            </div>
                                            <div className={styles.flexKhuyenMai}>
                                                <p className={styles.inKM}>KM</p>
                                                <p>Trả góp 0% - 0 phí - 0 trả</p>
                                            </div>
                                            <div onClick={() => handleBuyNow(product._id)}>
                                                <p style={{ fontSize: '13px', color: '#2e5986', cursor: 'pointer', fontWeight: 'bold' }}> Xem thêm <GrLinkNext /></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SearchResults;
