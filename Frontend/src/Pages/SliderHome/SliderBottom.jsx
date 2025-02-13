import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './SliderBottom.module.css';
// import { useState } from 'react';

const SliderBottom = () => {
    // const [item, setItem] = useState();
    const slideBottomItem = [
        {
            name: 'Trần Viết Chính',
            role: 'Software engineer',
            image: 'https://itguru.vn/blog/wp-content/uploads/2018/07/ky-su-phan-mem.jpg',
            detail: 'Từ sau cơ hội hợp tác với TranChinh Store là mình có thêm địa chỉ để mua sắm đồ công nghệ rất hợp lý ở cả Đà Nẵng và Thừa Thiên Huế quê mình.'
        },
        {
            name: 'Nguyễn Hữu Luật',
            role: 'service management',
            image: 'https://static.topcv.vn/cms/ky-su-phan-mem-topcv%20(2)642a7fee0d6f9.jpg',
            detail: 'TranChinh Store là thương hiệu yêu thích của mình, luôn tin tưởng ghé qua mua hàng mỗi dịp iPhone ra sản phẩm mới.'
        },
        {
            name: 'Thái Nguyễn Văn Ngọc',
            role: 'Graphics engineer',
            image: 'https://static-images.vnncdn.net/files/publish/2023/4/25/ky-su-cntt-2-139.jpg',
            detail: 'Mình biết tới TranChinh nhờ 1 vài anh em trong nghề giới thiệu, từ đó là tốn kha khá "máu" đầu tư cho đồ công nghệ mới'
        },
        {
            name: 'Ngô Bá Quang',
            role: 'Hardware engineer',
            image: 'https://icdn.24h.com.vn/upload/2-2024/images/2024-04-01/Sot-AI-Ky-su-phan-mem-AI-co-luong-len-toi-1-trieu-USD-2-1711944702-892-width1085height615.png',
            detail: 'Cảm ơn TranChinh Store đã cho “Mợ” cơ hội là một trong những khách hàng đầu tiên sở hữu cực phẩm S25 Ultra của Samsung. “Cậu” Bình An ở nhà chắc cũng đang mê lắm đấy!'
        },
    ]



    return (
        <div className={styles.sliderContainer}>
            <strong >Khách hàng của TranChinh Store</strong>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
            >
                {
                    slideBottomItem.map((items, index) => (
                        <div key={index}>
                            <SwiperSlide>
                                <div className={styles.slideItemBottom}>
                                    <img className={styles.imageSlideBottom} src={items.image} alt='Product' />
                                    <div className={styles.textContentBottom}>
                                        <h5>{items.name}</h5>
                                        <p style={{ color: '#2e5986' }}>{items.role}</p>
                                        <p>{items.detail}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default SliderBottom;
