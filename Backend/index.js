const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const connectDB = require('./config/db');
const productRouter = require('./routes/productRoute')
const usersRouter = require('./routes/userRoute')
const orderRouter = require('./routes/orderRoute')
const reviewRouter = require('./routes/reviewRoute');
const { chatbot } = require('./utils/chatbot');
require('dotenv').config();



const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB();

//API của thằng sản phẩm
app.use('/api/v1/', productRouter)
//API của thằng user(login, resgister)
app.use('/api/v2/', usersRouter)
//API cuar thành order
app.use('/api/v3/', orderRouter);
//API danh gia
app.use('/api/v4/', reviewRouter)

//API của thằng chatbot
app.post('/api/chatbot', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: 'Câu hỏi không được để trống'
            });
        }

        // console.log('Received question:', question);
        const answer = await chatbot(question);
        // console.log('Chatbot response:', answer);

        return res.status(200).json({
            success: true,
            answer: answer
        });
    } catch (error) {
        console.error('Chatbot error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi xử lý chatbot',
            error: error.message
        });
    }
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});