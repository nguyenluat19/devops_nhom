const { hashPassword, comparePassword } = require("../helper/userHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken")

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, gender } = req.body;
        if (!name) {
            return res.send({ error: 'Hãy nhập tên' })
        };
        if (!email) {
            return res.send({ message: 'Hãy nhập email' })
        }
        if (!password) {
            return res.send({ message: 'Hãy nhập password ' })
        }
        if (!phone) {
            return res.send({ message: 'hãy nhập sdt' })
        }
        if (!address) {
            return res.send({ message: 'Hãy nhập địa chỉ' })
        }
        if (!gender) {
            return res.send({ message: 'Hãy nhập gender' })
        }

        //Kiểm tra  tk tồn tại hay chưa
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            res.status(200).send({
                success: false,
                message: 'Đã đăng kí, vui lòng đăng nhập'
            })
        }

        //mã hóa bcrypt
        const hash = await hashPassword(password)
        const user = await new userModel({
            name,
            email,
            password: hash,
            phone,
            address,
            gender
        }).save();

        res.status(201).send({
            message: 'Đăng kí thành công',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Looi khi đăng kí'
        })
    }
}

//***********************login********************************* */

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).send({
                message: 'tài khoản hoặc mật khẩu không hợp lệ',
                error,
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email chưa được đăng ký',
                error: error.message
            });
        }

        const soSanh = await comparePassword(password, user.password);
        if (!soSanh) {
            res.status(404).send({
                success: false,
                message: 'Sai mật khẩu',
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }
        );

        res.status(200).send({
            message: 'Đăng nhập thành công',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi khi login',
            error: error.message
        })
    }
}

/*********************Hiển thị tất cả người dùng********************* */
const getAllUsers = async (req, res) => {
    try {
        const getUser = await userModel.find();
        if (!getUser || getUser.length === 0) {
            res.status(404).json({
                message: 'Không tìm thấy người dùng'
            })
        }
        res.status(200).json(getUser)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi không lấy được tất cả user',
            error: error.message
        })
    }
}

//****************************Xoa nguoi dung******************************** */
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await userModel.findById(id);
        if (!userExist) {
            return res.status(404).json({
                message: 'khong tim thay id ngui dung de xoa'
            })
        }
        res.status(200).json(userExist)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi khi lấy người dùng theo id',
            error: error.message
        })
    }
}


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const xoaUser = await userModel.findByIdAndDelete(id);
        if (!xoaUser) {
            return res.status(404).json({
                message: 'Nguoi dungf ko ton tai'
            })
        }
        res.status(200).json({
            message: 'Xoas người dùng thành công'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi khi Xoa người dùng ',
            error: error.message
        })
    }
}

// getall số lượng users
const demSoLuongUsers = async (req, res) => {
    try {
        const usersCount = await userModel.countDocuments();

        res.status(200).send({
            users: usersCount,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Lỗi không thể đếm số lượng users'
        })
    }
}

module.exports = { registerController, loginController, getAllUsers, getUserById, deleteUser, demSoLuongUsers }