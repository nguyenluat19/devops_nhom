import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/allComment.module.css";
import { CiPaperplane } from "react-icons/ci";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const CommentSection = () => {
  const { id } = useParams();
  const [auth] = useAuth();
  const [comments, setComments] = useState([]);
  const [hoveredComment, setHoveredComment] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [totalCmt, setTotalCmt] = useState([])

  const API_URL = import.meta.env.VITE_API;

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`${API_URL}/api/v4/reviews/${id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("Lỗi khi lấy bình luận:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async (commentId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bình luận này không?")) return;

    try {
      await axios.delete(`${API_URL}/api/v4/reviews/delete/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
      alert("Không thể xóa bình luận. Vui lòng thử lại.");
    }
  };

  const handleLogin = () => {
    navigate("/login", { state: "/cart" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || rating === 0) {
      toast.error("Vui lòng nhập nội dung bình luận và chọn đánh giá sao.")
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/v4/reviews`,
        {
          userId: auth?.user?.id,
          productId: id,
          rating: rating,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "application/json",
          },
        }

      );


      setComments([response.data.review, ...comments]);
      setNewComment("");
      setRating(0);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error.response?.data || error.message);
      alert("Không thể gửi bình luận. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    const getTotalOneProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v4/reviews/total/${id}`);
        console.log("Tổng số bình luận:", response.data);
        setTotalCmt(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalOneProduct();
  }, [id]);

  return (
    <div className={styles.commentSection}>

      <div className={styles.blSP}>
        <h4> Bình luận về sản phẩm</h4>
        <div>
          <div style={{ fontSize: '14px', color: '#4b4b4b' }}>Tổng số bình luận:
            <strong >({totalCmt.totalReviews})</strong>
          </div>
        </div>

      </div>
      <div className={styles.formComment}>
        <form className={styles.commentForm} onSubmit={handleSubmit}>
          {/* danh gia sao */}
          <div className={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= (hoverRating || rating) ? styles.activeStar : styles.star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Nhập bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <div className={styles.designButton}>
            {auth?.token ? (
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
                <CiPaperplane style={{ fontSize: "20px", marginLeft: "5px" }} />
              </button>
            ) : (
              <button className={styles.btnVuiLongDangNhap} onClick={handleLogin}>
                Vui lòng đăng nhập
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <p className="text-center">Đang tải bình luận...</p>
      ) : (
        <div className={styles.commentList}>
          {comments.length > 0 ? (
            comments.map((cmt, index) => (
              <div
                key={cmt._id}
                className={styles.commentItem}
                onMouseEnter={() => setHoveredComment(index)}
                onMouseLeave={() => setHoveredComment(null)}
              >
                <header className={styles.commentHeader}>
                  <strong className={styles.tenNguoiDung}>{cmt.user?.name || "Người dùng"}</strong>
                  <small>{new Date(cmt.createdAt).toLocaleString()}</small>
                </header>
                <div className={styles.userRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= cmt.rating ? styles.activeStar : styles.star}>
                      ★
                    </span>
                  ))}
                </div>
                <p>{cmt.comment}</p>

                {hoveredComment === index && (
                  <span
                    className={styles.deleteIcon}
                    onClick={() => handleDelete(cmt._id)}
                  >
                    🗑️
                  </span>
                )}

                {cmt.replies && cmt.replies.length > 0 && (
                  <div className={styles.replySection}>
                    <h4>Phản hồi:</h4>
                    {cmt.replies.map((reply, rIndex) => (
                      <div key={rIndex} className={styles.replyItem}>
                        <header>
                          <strong >{auth?.user?.name || "Người dùng"}</strong>
                          <small >{new Date(reply.createdAt).toLocaleString()}</small>
                        </header>
                        <p>{reply.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
                {cmt.reply && (
                  <div className={styles.storeReply}>
                    <h4>Phản hồi từ cửa hàng:</h4>
                    <p>{cmt.reply}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center">Chưa có bình luận nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;