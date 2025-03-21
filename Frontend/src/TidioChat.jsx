import { useEffect } from "react";
import { useAuth } from "./context/auth";

const TidioChat = () => {
    const [auth] = useAuth();

    useEffect(() => {
        const loadTidioScript = () => {
            if (!document.getElementById("tidio-script")) {
                const script = document.createElement("script");
                script.id = "tidio-script";
                script.src = "https://code.tidio.co/bxcxy3kmxocya5xei0drntdc2jelhvkh.js";
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                    if (auth?.user?.email && window.tidioChatApi) {
                        window.tidioChatApi.reset(); // Reset chat data
                        window.tidioChatApi.setVisitorData({
                            email: auth.user.email,
                            name: auth.user.name || "Người dùng",
                        });
                    }
                };
            } else {
                if (auth?.user?.email && window.tidioChatApi) {
                    window.tidioChatApi.reset(); // Reset when auth changes
                    setTimeout(() => {
                        window.tidioChatApi.setVisitorData({
                            email: auth.user.email,
                            name: auth.user.name || "Người dùng",
                        });
                    }, 1000);
                }
            }
        };

        loadTidioScript();
    }, [auth]);

    return null;
};

export default TidioChat;