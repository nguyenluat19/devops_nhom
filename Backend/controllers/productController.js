const productModel = require('../models/productModel');
const Product = require('../models/productModel')

//Tạo mới sản phẩm
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json({
            message: 'Tạo sản phẩm mới thành công',
            savedProduct
        })
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({
            message: 'Lỗi khi tạo sản phẩm mới',
            error: error.message,
        })
    }
}

//Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            res.status(404).json({ message: 'Không có bất kỳ sản phẩm nào' })
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({
            message: 'Lỗi khi get all products',
            error: error.message
        })
    }
}

//Lấy 1 danh sách sản phẩm (ví dụ chỉ lấy 5 hoặc 10 sản phẩm để hiển thị lên trang web);
const getListProducts = async (req, res) => {
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;
        const products = await Product
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        res.status(400).json({
            message: 'Loi khi get list products',
            error: error.message
        })
    }
}

//lấy snar phẩm theo id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await Product.findById(id);
        if (!productExist) {
            res.status(404).json({ message: 'Không tồn tại sản phẩm nào có id này' })
        }
        res.status(200).json(productExist)
    } catch (error) {
        res.status(400).json({
            message: 'Lỗi khi getProductById',
            error: error.message
        })
    }
}

//update sản phẩm 
const updateAllProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await Product.findById(id);
        if (!productExist) {
            res.status(404).json({ message: 'Không thể update sản phẩm' })
        }
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json({ updateProduct })
    } catch (error) {
        res.status(400).json({
            message: 'Lỗi khi update Product',
            error: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await Product.findById(id);
        if (!productExist) {
            return res.status(404).json({ message: 'Khoong thể xóa sản phẩm' });
        }
        await Product.findByIdAndDelete(id)
        res.status(200).json({ message: 'xoa san pham thanh cong' });
    } catch (error) {
        res.status(400).json({
            message: 'Lỗi khi xóa sản phẩm',
            error: error.message
        })
    }
}

//Tìm kiếm sản phẩm 
const searchProduct = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await Product.find({
            $or: [
                {
                    name: { $regex: keyword, $options: "i" }
                },
                {
                    description: { $regex: keyword, $options: "i" },
                }
            ]
        }).select("-photo")
        // if (!result) {
        //     res.status(404).send({
        //         message: 'Không tìm thấy sản phẩm'
        //     })
        // }

        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Lỗi không tìm thấy sản phẩm'
        })
    }
}


const demSoLuongSP = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();

        res.status(200).send({
            products: productCount,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Lỗi không thể đếm số lượng sản phẩm'
        })
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getListProducts,
    getProductById,
    updateAllProduct,
    deleteProduct,
    searchProduct,
    demSoLuongSP
}