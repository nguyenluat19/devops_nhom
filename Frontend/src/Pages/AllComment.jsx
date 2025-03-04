import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./styles/allComment.module.css";

const CommentSection = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:3000/api/v4/reviews/${id}`)
      .then(response => {
        console.log("Danh sách bình luận:", response.data);
        setComments(response.data);
      })
      .catch(error => console.error("Lỗi khi lấy bình luận:", error));
  }, [id]);

  const handleCommentSubmit = async () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const userId = authData?.user?.id;
    const token = authData?.token;
    console.log("User ID:", userId);
    console.log("Token:", token);

    if (!userId) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }

    if (!newComment.trim() || rating === 0) {
      alert("Vui lòng nhập bình luận và chọn số sao!");
      return;
    }

    const commentData = {
      user: userId,
      product: id,
      rating: rating,
      comment: newComment,
    };

    console.log("Gửi dữ liệu:", commentData);
    console.log("Token:", token);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v4/reviews`, // <-- Thay đổi endpoint
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Phản hồi từ server:", response.data);

      setComments([...comments, response.data.review]);
      setNewComment("");
      setRating(0);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error.response?.data || error.message);
      alert(`Lỗi: ${error.response?.data?.message || "Không thể gửi bình luận!"}`);
    }
  };

  return (
    <div className={styles.commentSection}>
      <h3>Bình luận</h3>
      <div className={styles.commentList}>
        {comments.length > 0 ? (
          comments.map((cmt, index) => (
            <div key={index} className={styles.commentItem}>
              <p>{cmt.comment}</p>
              <small>{new Date(cmt.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>Chưa có bình luận nào.</p>
        )}
      </div>

      {/* Chọn số sao */}
      <div className={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Form nhập bình luận */}
      <div className={styles.commentForm}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Nhập bình luận..."
        />
        <button onClick={handleCommentSubmit}>Gửi</button>
      </div>
    </div>
  );
};

export default CommentSection;
