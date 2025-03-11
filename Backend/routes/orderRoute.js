// Backend/routes/orderRoute.js
const express = require('express');
const { createOrder, getOrderById, getAllOrders, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/:id', getOrderById);
// router.get('/user/:userId/orders', getOrdersByUser);
router.get('/getAllOrder', getAllOrders)
router.delete('/delete/order/:id', deleteOrder)

module.exports = router;