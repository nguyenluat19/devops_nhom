import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API;
const ReplyComment = () => {
    const [reviews, setReviews] = useState([]);
    const [replies, setReplies] = useState({});

    // Gọi API lấy danh sách bình luận
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v4/all-reviews`);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error("Lỗi khi lấy bình luận:", error);
            }
        };
        fetchReviews();
    }, []);

    // Xử lý nhập phản hồi
    const handleReplyChange = (reviewId, value) => {
        setReplies((prevReplies) => ({
            ...prevReplies,
            [reviewId]: value,
        }));
    };

    // Gửi phản hồi lên server
    const handleReplySubmit = async (reviewId) => {
        if (!replies[reviewId]) {
            alert("Vui lòng nhập phản hồi!");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/v4/reply/${reviewId}`, {
                reply: replies[reviewId],
            });

            if (response.data.success) {
                alert("Phản hồi thành công!");
                setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                        review._id === reviewId ? { ...review, reply: replies[reviewId] } : review
                    )
                );
                setReplies((prevReplies) => ({ ...prevReplies, [reviewId]: "" }));
            }
        } catch (error) {
            console.error("Lỗi khi phản hồi:", error);
            alert("Phản hồi thất bại!");
        }
    };

    return (
        <div className="container">
            <h2>Danh sách bình luận</h2>
            {reviews.length === 0 ? (
                <p>Không có bình luận nào.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <h3>{review.user?.name || "Người dùng ẩn danh"}</h3>
                        <p><strong>Đánh giá:</strong> {review.rating}/5</p>
                        <p><strong>Bình luận:</strong> {review.comment}</p>

                        {review.reply && (
                            <p><strong>Phản hồi:</strong> {review.reply}</p>
                        )}

                        <textarea
                            value={replies[review._id] || ""}
                            onChange={(e) => handleReplyChange(review._id, e.target.value)}
                            placeholder="Nhập phản hồi..."
                        />
                        <button onClick={() => handleReplySubmit(review._id)}>Trả lời</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReplyComment;
