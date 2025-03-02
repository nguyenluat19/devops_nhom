// Backend/controllers/orderController.js
const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
    try {
        const { user, products, totalPrice } = req.body;
        const newOrder = new Order({ user, products, totalPrice });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi tạo đơn hàng', error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('products.product');
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi lấy đơn hàng', error: error.message });
    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi lấy đơn hàng của người dùng', error: error.message });
    }
};

module.exports = { createOrder, getOrderById, getOrdersByUser };