import { useEffect } from "react";
import { useAuth } from "./context/auth";
import { useLocation } from "react-router-dom";

const TidioChat = () => {
    const [auth] = useAuth();
    const location = useLocation();

    // Effect riêng để xử lý ẩn/hiện Tidio dựa trên location
    useEffect(() => {
        if (window.tidioChatApi) {
            if (location.pathname.includes('dashboard')) {
                window.tidioChatApi.hide();
            } else {
                window.tidioChatApi.show();
            }
        }
    }, [location.pathname]);

    // Effect để load script và xử lý authentication
    useEffect(() => {
        const loadTidioScript = () => {
            if (!document.getElementById("tidio-script")) {
                const script = document.createElement("script");
                script.id = "tidio-script";
                script.src = "https://code.tidio.co/bxcxy3kmxocya5xei0drntdc2jelhvkh.js";
                script.async = true;

                script.onload = () => {
                    // Kiểm tra và ẩn ngay nếu đang ở dashboard
                    if (location.pathname.includes('dashboard')) {
                        window.tidioChatApi.hide();
                    }

                    if (auth?.user?.email) {
                        window.tidioChatApi.setVisitorData({
                            email: auth.user.email,
                            name: auth.user.name || "Người dùng",
                        });
                    }
                };

                document.body.appendChild(script);
            }
        };

        loadTidioScript();
    }, [auth?.user?.email]);

    return null;
};

export default TidioChat;