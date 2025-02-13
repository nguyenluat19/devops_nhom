import './Footer.css'

const Footer = () => {
    return (
        <footer className="text-white py-5" style={{ backgroundColor: "#2e5986" }}>
            <div className="container">
                <div className="row">
                    {/* Cột 1: Logo & Giới thiệu */}
                    <div className="col-md-3">
                        <h4 className="fw-bold">MyWebsite.com</h4>
                        <p>Chuyên cung cấp sản phẩm công nghệ chính hãng với chất lượng đảm bảo.</p>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div className="col-md-3">
                        <h5 className="fw-bold">Liên kết</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Trang chủ</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Sản phẩm</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Giới thiệu</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Cột 3: Hỗ trợ khách hàng */}
                    <div className="col-md-3">
                        <h5 className="fw-bold">Hỗ trợ khách hàng</h5>
                        <ul className="list-unstyled">
                            <li><i className="bi bi-telephone-fill"></i> 1800.2097</li>
                            <li><i className="bi bi-envelope-fill"></i> support@yourbrand.com</li>
                            <li><i className="bi bi-geo-alt-fill"></i> 216/16 Nguyễn Phước Nguyên</li>
                        </ul>
                    </div>

                    {/* Cột 4: Mạng xã hội & Ứng dụng */}
                    <div className="col-md-3">
                        <h5 className="fw-bold">Kết nối với chúng tôi</h5>
                        <div>
                            <a href="#" className="text-white me-3"><i className="bi bi-facebook fs-4"></i></a>
                            <a href="#" className="text-white me-3"><i className="bi bi-instagram fs-4"></i></a>
                            <a href="#" className="text-white me-3"><i className="bi bi-tiktok fs-4"></i></a>
                            <a href="#" className="text-white"><i className="bi bi-youtube fs-4"></i></a>
                        </div>
                        <h6 className="mt-3">Tải ứng dụng</h6>
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width="120" className="me-2" />
                            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" width="120" />
                        </div>
                    </div>
                </div>

                {/* Dòng bản quyền */}
                <hr className="border-light my-4" />
                <div className="text-center">© 2025 YourBrand. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;
