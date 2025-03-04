const express = require('express')
const { createReview, replyComment, deleteReview, getProductReviews, getAllTotalReviews, getTotalReviewsByProduct } = require('../controllers/reviewController')
const router = express.Router()

router.post('/reviews', createReview)
router.put('/reviews/:id/reply', replyComment)
router.delete('/reviews/delete/:id', deleteReview)

//Lấy tổng số commemt 
router.get('/reviews/total', getAllTotalReviews);
//Lấy tổng comment của 1 sản phẩm 
router.get('/reviews/total/:productId', getTotalReviewsByProduct);

router.get('/reviews/:productId', getProductReviews);
module.exports = router