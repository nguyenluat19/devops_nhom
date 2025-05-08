// require('dotenv').config();
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const productModel = require('../models/productModel');

// // Khởi tạo Google AI model
// const genAI = new GoogleGenerativeAI(process.env.CHATBOT_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// async function chatbot(question) {
//     try {
//         const products = await productModel.find({}).limit(10);
//         const productData = products.map(
//             (item) => `Tên sản phẩm: ${item.name}, Giá: ${item.price || 'Không rõ'}, Hình ảnh: ${item.image || 'Không rõ'}`
//         ).join('\n');

//         const prompt = `
// Bạn là một trợ lý thông minh chuyên hỗ trợ người dùng trong việc tìm kiếm thông tin sản phẩm trong cửa hàng. Dưới đây là danh sách sản phẩm:
// ${productData}

// Câu hỏi của người dùng: ${question}
// Hãy trả lời một cách chính xác, dựa trên dữ liệu sản phẩm và không bịa đặt thông tin không có.`;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const answer = response.text();

//         return answer;

//     } catch (error) {
//         console.error('Chatbot error:', error);
//         throw new Error('Lỗi xử lý chatbot: ' + error.message);
//     }
// }

// module.exports = { chatbot };


require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const productModel = require('../models/productModel'); // Đảm bảo đường dẫn này chính xác

// Khởi tạo Google AI model
const genAI = new GoogleGenerativeAI(process.env.CHATBOT_API_KEY);
//Lưu ý: Model "gemini-2.0-flash" có thể không tồn tại hoặc là một tên không chính xác.
//Hãy kiểm tra tài liệu Google AI để biết tên model chính xác, ví dụ: "gemini-1.5-flash" hoặc "gemini-pro".
//Giả sử bạn muốn dùng "gemini-1.5-flash-latest" là một model phổ biến và mạnh mẽ.
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


async function chatbot(question) {
    try {
        // Lấy sản phẩm, đảm bảo có _id (hoặc id)
        // const products = await productModel.find({}).limit(10).lean(); //giới hạn 10 sản phẩm để tránh quá tải dữ liệu
        const products = await productModel.find({}).lean(); //giới hạn 10 sản phẩm để tránh quá tải dữ liệu

        const productData = products.map(
            // (item) => `ID: ${item._id}, Tên sản phẩm: ${item.name}, Giá: ${item.price || 'Không rõ'}, Hình ảnh: ${item.image || 'Không rõ'}`
            (item) => `ID: ${item._id}, Tên sản phẩm: ${item.name}, Giá: ${item.price || 'Không rõ'}`
        ).join('\n');

        const prompt = `
Bạn là một trợ lý thông minh chuyên nghiệp trong website bán điện thoại, đây là danh sách sản phẩm trong cửa hàng:
${productData}

Câu hỏi của người dùng: ${question}
Hãy trả lời một cách tự nhiên và thân thiện.
Nếu bạn đề cập đến một sản phẩm cụ thể từ danh sách trên, hãy trình bày thông tin sản phẩm đó bằng cách sử dụng định dạng SAU (có thể thêm giải thích chú thích nếu cần):
PRODUCT_ITEM_START
ID: [ID của sản phẩm]
Tên: [Tên sản phẩm]
Giá: [Giá sản phẩm]
Hình ảnh: https://png.pngtree.com/png-clipart/20240314/original/pngtree-smartphone-mobile-phone-flat-style-cartoon-illustration-png-image_14588283.png

PRODUCT_ITEM_END
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const answer = response.text();

        return answer;

    } catch (error) {
        console.error('Chatbot error:', error);
        // Cung cấp thêm chi tiết lỗi nếu có từ API của Google AI
        let errorMessage = 'Lỗi xử lý chatbot: ';
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
            errorMessage += error.response.data.error.message;
        } else {
            errorMessage += error.message;
        }
        // Trả về lỗi cho frontend để hiển thị
        // throw new Error(errorMessage); // Hoặc trả về một đối tượng lỗi cụ thể
        // Vì frontend mong đợi { answer: ... } hoặc lỗi, ta sẽ trả về lỗi theo cách xử lý hiện tại
        // Nhưng tốt hơn là backend nên throw lỗi và frontend bắt lỗi axios
        return `Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn. Chi tiết: ${error.message}`;
    }
}

module.exports = { chatbot };