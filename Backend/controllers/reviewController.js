const Product = require('../models/productModel');
const reviewModel = require('../models/reviewModel');
const User = require('../models/userModel')

const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { productId } = req.params;

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Bạn cần đăng nhập để bình luận' });
        }

        const review = new reviewModel({
            user: req.user.id, // Lấy từ token
            product: productId,
            rating,
            comment
        });

        await review.save();

        res.status(201).json({
            success: true,
            message: 'Đánh giá thành công',
            review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không thể tạo đánh giá',
            error: error.message
        });
    }
};


const replyComment = async (req, res) => {
    try {
        const { reply } = req.body
        const review = await reviewModel.findById(req.params.id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Danh gia khong ton tai',
            })
        }

        review.reply = reply;
        await review.save();

        res.status(200).json({
            success: true,
            message: 'Tra loi thanh cong',
            review
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'khong the reply comment',
            error: error.message
        })
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await reviewModel.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Danhs giá không tồn tại'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Xóa đánh giá thành công',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'khong the xoa comment',
            error: error.message
        })
    }
}
// hdanh đánh giá của một sản phẩm
const getProductReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ product: req.params.productId })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đánh giá', error: error.message });
    }
};


//lấy đánh giá của tất cả sản phẩm 
const getAllTotalReviews = async (req, res) => {
    try {
        const totalReviews = await reviewModel.countDocuments();
        res.status(200).json({
            success: true,
            totalReviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy tổng số đánh giá',
            error: error.message
        });
    }
};

//Lấy tổng số đánh giá của sản phẩm cụ thể 
const getTotalReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const totalReviews = await reviewModel.countDocuments({ product: productId });

        res.status(200).json({
            success: true,
            productId,
            totalReviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy tổng số đánh giá cho sản phẩm',
            error: error.message
        });
    }
};



module.exports = {
    createReview,
    replyComment,
    deleteReview,
    getProductReviews,
    getAllTotalReviews,
    getTotalReviewsByProduct
}