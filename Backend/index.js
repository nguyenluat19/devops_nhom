const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRoute')
const usersRouter = require('./routes/userRoute')
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

//API của thằng sản phẩm
app.use('/api/v1/', productRouter)
//API của thằng user(login, resgister)
app.use('/api/v2', usersRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});