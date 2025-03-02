// Backend/routes/orderRoute.js
const express = require('express');
const { createOrder, getOrderById, getOrdersByUser } = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/:id', getOrderById);
router.get('/user/:userId/orders', getOrdersByUser);

module.exports = router;