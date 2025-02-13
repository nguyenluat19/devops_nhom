import styles from './Slider.module.css'
import { FaApple } from "react-icons/fa";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const SliderHome = () => {
    const categories = [
        { name: 'Điện thoại', icon: '📱' },
        { name: 'Apple', icon: <FaApple /> },
        { name: 'Laptop', icon: '💻' },
        { name: 'Tablet', icon: '📟' },
        { name: 'Màn hình', icon: '🖥' },
        // { name: 'Điện máy', icon: '🏠' },
        { name: 'Đồng hồ', icon: '⌚' },
        { name: 'Âm thanh', icon: '🎧' },
        { name: 'Smart home', icon: '🏡' },
        { name: 'Phụ kiện', icon: '🔌' },
    ];

    const sliderList = [
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/02/07/1200x375.png', },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/09/promotion-kv-redmi-note-14-series.png' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/09/s24-web.png' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2024/12/28/redmagic-10-pro-desktop-1.png' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/10/honor-x5b-1200x375.jpg' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/07/tuf-hoang-ha-1200x375.jpg' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2024/12/26/tecno-30c-w-2490.png' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/06/redmi-buds-6-pro-01.jpg' },
    ]

    const sliderList2 = [
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/11/note14.png' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/02/07/sanphamhot2-a06.png' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/01/11/honor200.png' },
        { image: 'https://cdn.hoanghamobile.com/i/home/Uploads/2025/02/08/mac-4.png' }
    ]
    return (
        <div className={styles.sliderHome}>
            <div className={styles.DanhMucLeft}>
                <div className={styles.DanhMucLeftItem}>
                    <strong>Danh mục</strong>
                    <ul style={{ listStyle: 'none', margin: '0' }}>
                        {categories.map((category, index) => (
                            <li key={index} style={{ textDecoration: 'none' }}>
                                <span className="icon">{category.icon}</span>
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.sliderRight}>
                <div className={styles.sliderRightItem}>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >

                        {
                            sliderList.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img className={styles.imageSliderMain} src={item.image} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                    <div className={styles.sliderRightItem2}>
                        {sliderList2.map((item, index) => (
                            <div key={index} className={styles.sliderRightItem2Item}>
                                <img className={styles.imageSliderRightItem2Item} src={item.image} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderHome
