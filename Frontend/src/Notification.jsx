import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import styles from './Notification.module.css';

const Notification = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('auth') || sessionStorage.getItem('auth');
        const hasSeenNotificationThisSession = sessionStorage.getItem('hasSeenNotification');

        // Hiển thị thông báo nếu người dùng đăng nhập và chưa xem thông báo trong phiên này
        if (isLoggedIn && !hasSeenNotificationThisSession) {
            setIsVisible(true);
        } else if (!isLoggedIn) {
            // Nếu chưa đăng nhập, hiển thị mặc định
            setIsVisible(true);
        }
    }, []);

    const closeNotification = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenNotification', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className={styles.notificationOverlay}>
            <div className={styles.notificationContainer}>
                <div className={styles.notificationHeader}>
                    <h3>⚠️ GẤP LẮM ROIIII ⚠️ </h3>
                    <button
                        className={styles.closeButton}
                        onClick={closeNotification}
                        aria-label="Đóng thông báo"
                    >
                        <IoClose />
                    </button>
                </div>
                <div className={styles.notificationContent}>
                    <p>Chào mừng bạn đến với website của chúng tôi!</p>
                    <p>Hiện tại chúng tôi đang có chương trình khuyến mãi đặc biệt:</p>
                    <ul>
                        <li>Giảm giá 15% cho tất cả sản phẩm mới</li>
                        <li>Miễn phí vận chuyển cho đơn hàng trên 500.000đ</li>
                        <li>Trả góp 0% lãi suất cho các sản phẩm cao cấp</li>
                    </ul>
                </div>
                <div className={styles.notificationFooter}>
                    <button className={styles.acceptButton} onClick={closeNotification}>
                        Đã hiểu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;