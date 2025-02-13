const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');


const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized: Invalid token',
            error: error.message
        });
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== 1) {
            return res.status(403).json({
                message: 'Access denied: Admins only'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Error in admin middleware',
            error: error.message
        });
    }
};



module.exports = { requireSignIn, isAdmin };

// const JWT = require('jsonwebtoken');
// const userModel = require('../models/userModel');

// const requireSignIn = async (req, res, next) => {
//     try {
//         const decode = JWT.verify(
//             req.headers.authorization,
//             process.env.JWT_SECRET
//         );
//         req.user = decode;
//         console.log("Decoded User:", req.user);
//         next();
//     } catch (error) {
//         res.status(401).send({
//             message: 'Unauthorized',
//             error: error.message
//         });
//     }
// }

// const isAdmin = async (req, res, next) => {
//     try {
//         const user = await userModel.findById(req.user._id);
//         console.log("User Role:", user.role);
//         if (user.role !== 1) {
//             return res.status(401).send({
//                 message: 'Access denied',
//                 error: 'Admin resource. Access denied.'
//             });
//         } else {
//             next();
//         }
//     } catch (error) {
//         res.status(401).send({
//             message: 'Error in admin middleware',
//             error: error.message
//         });
//     }
// }

// module.exports = { requireSignIn, isAdmin };