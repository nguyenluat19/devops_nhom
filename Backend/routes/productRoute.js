const express = require('express');
const { createProduct,
    getAllProducts,
    getProductById,
    updateAllProduct,
    deleteProduct,
    searchProduct,
    demSoLuongSP,
    getListProducts }
    = require('../controllers/productController');
const router = express.Router();

router.post('/product', createProduct)
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)
router.put('/update/products/:id', updateAllProduct)
router.delete('/delete/products/:id', deleteProduct)
router.get('/search/:keyword', searchProduct)
router.get('/demSoLuongSP', demSoLuongSP)
router.get('/products/:page', getListProducts)
module.exports = router;