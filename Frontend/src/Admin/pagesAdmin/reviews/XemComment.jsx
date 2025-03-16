import { Breadcrumb } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./xemComment.module.css";
import { CiPaperplane } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const API_URL = import.meta.env.VITE_API;

const XemComment = () => {
    const [reviews, setReviews] = useState([]);
    const [replyComment, setReplyComment] = useState({});

    // Hàm lấy tất cả bình luận (bao gồm cả phản hồi)
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v4/all-reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy bình luận:", error);
        }
    };

    // Hàm gửi phản hồi bình luận
    const replyToReview = async (reviewId) => {
        if (!replyComment[reviewId] || replyComment[reviewId].trim() === "") {

            return;
        }

        try {
            console.log("Gửi bình luận:", replyComment[reviewId]);

            const response = await axios.post(
                `${API_URL}/api/v4/reviews/${reviewId}/reply`,
                { reply: replyComment[reviewId] },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Phản hồi từ server:", response.data);
            toast.success("Reply message thành công");

            // Cập nhật bình luận trong state để hiển thị ngay
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review._id === reviewId
                        ? { ...review, replies: [...(review.replies || []), response.data] }
                        : review
                )
            );

            setReplyComment({ ...replyComment, [reviewId]: "" }); // Xóa nội dung input sau khi gửi
        } catch (error) {
            console.error("Lỗi khi trả lời bình luận:", error.response ? error.response.data : error);
            toast.error("Lỗi khi gửi phản hồi!");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const hanldXoaBl = async (reviewId) => {
        try {
            await axios.delete(`${API_URL}/api/v4/reviews/delete/${reviewId}`);
            setReviews((prevReviews) => prevReviews.filter((comment) => comment._id !== reviewId));
            toast.success('Xóa bình luận thành công')
        } catch (error) {
            console.error("Lỗi khi xóa bình luận:", error);
            alert("Không thể xóa bình luận. Vui lòng thử lại.");
        }
    };


    return (
        <>
            <Breadcrumb
                items={[
                    { title: "Trang chủ" },
                    { title: "QL người dùng" },
                    { title: "Xem comment" },
                ]}
                style={{ margin: "16px 0" }}
            />

            <div id="reviews" className={styles.wrapAllComment}>
                <h3 className="text-center">Quản lý bình luận</h3>
                <div id="review-list" className={styles.allComment}>
                    {reviews.map((review) => (
                        <div key={review._id} className={styles.review}>
                            <p>
                                <strong>{review.user.name}</strong> (Email: {review.user.email}): {review.comment}
                            </p>
                            <p>Đánh giá: {review.rating} sao</p>

                            {/* Hiển thị danh sách phản hồi */}
                            {review.replies && review.replies.length > 0 && (
                                <div className={styles.replies}>
                                    <strong>Phản hồi:</strong>
                                    {review.replies.map((reply, index) => (
                                        <p key={index} className={styles.replyItem}>➥ {reply}</p>
                                    ))}
                                </div>
                            )}

                            {/* Form trả lời bình luận */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    replyToReview(review._id);
                                }}
                                className={styles.formReplyBl}
                            >
                                <textarea
                                    value={replyComment[review._id] || ""}
                                    onChange={(e) => setReplyComment({ ...replyComment, [review._id]: e.target.value })}
                                    placeholder="Trả lời bình luận..."
                                />
                                <div className={styles.wrapButtonGuiBl}>
                                    <button className={styles.buttonXoaBl} onClick={() => hanldXoaBl(review._id)}>
                                        Xóa
                                        <MdDeleteOutline style={{ fontSize: "20px", marginLeft: "5px" }} />
                                    </button>
                                    <button className={styles.buttonGuiBl} type="submit">
                                        Gửi bình luận
                                        <CiPaperplane style={{ fontSize: "20px", marginLeft: "5px" }} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default XemComment;
