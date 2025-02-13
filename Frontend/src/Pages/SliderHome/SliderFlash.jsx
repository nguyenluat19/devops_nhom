import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './SliderFlash.module.css';

const SliderFlash = () => {
    const [products, setProducts] = useState([]);
    const [countdown, setCountdown] = useState(4500);

    // Fetch danh sách sản phẩm
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/v1/products');
                setProducts(res.data);
            } catch (error) {
                console.log("Lỗi khi lấy danh sách sản phẩm flash:", error);
            }
        };
        getAllProducts();
    }, []);

    // Đếm ngược thời gian
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Chuyển đổi giây thành HH:MM:SS
    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

    return (
        <div className={styles.SliderFlash}>
            <div className={styles.clockFlashSale}>
                <h5>Đang diễn ra</h5>
                <p>Kết thúc trong: {formatTime(countdown)}</p>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.productCard}>
                            <img src={product.image} alt={product.name} className={styles.productImage} />
                            {/* <p className={styles.productName}>
                                {product.name}</p> */}
                            <h6 style={{ fontWeight: '600', fontSize: '13px', color: '#4b4b4b' }}> {product.name}</h6>
                            <p className={styles.giaFlash}> {product.price.toLocaleString()}đ</p>
                            <div className={styles.wrapperPhanGiaGoc}>
                                <p className={styles.giaGocFlash}> {product.priceGoc.toLocaleString()}đ</p>
                                <div className={styles.giamGiaFlash}>
                                    <p >-{product.discount}%</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderFlash;
