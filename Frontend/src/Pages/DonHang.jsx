import axios from "axios";
import { useEffect, useState } from "react"
const API_URL = import.meta.env.VITE_API;

const DonHang = () => {
    const [order, setOrder] = useState([])
    useEffect(() => {
        const getAllOrder = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v3/getAllOrder`);
                setOrder(response.data);
                // setFilteredProducts(response.data);
            } catch (error) {
                console.log("Lỗi khi lấy danh sách sản phẩm:", error);
            }
        };
        getAllOrder();
    }, [])
    return (
        <div>
            {order.map((product, index) => (
                <div key={index}>
                    <div>{product.user.name}</div>
                    <div>{product.user.email}</div>
                    <div>{product.products.name}</div>
                    <div>{product.products.price}</div>
                    <div>{product.quantity}</div>
                    <div>{product.totalPrice}</div>
                    <div>{product.status}</div>
                </div>
            ))}
        </div>
    )
}

export default DonHang
