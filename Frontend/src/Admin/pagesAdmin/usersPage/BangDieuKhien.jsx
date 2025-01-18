import { Breadcrumb } from "antd"
import axios from "axios";
import { useEffect, useState } from "react"
import './styleUser.css'
import { RiLuggageCartLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const BangDieuKhien = () => {
    const [soLuongProducts, setSoLuongProducts] = useState({ products: 0 });
    const [soLuongUsers, setSoLuongUsers] = useState({ users: 0 });

    //get all soó lượng sản phẩm
    useEffect(() => {
        const getSoLuongProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/demSoLuongSP');
                console.log('Lấy số lượng sản phẩm thành côgn');
                setSoLuongProducts(response.data)
            } catch (error) {
                console.log('Lỗi không thể lấy số lượng products', error);
            }
        };
        getSoLuongProducts()
    }, [])

    //get all số lượng người dùng 
    useEffect(() => {
        const getSoLuongUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v2/demSoLuonguser');
                setSoLuongUsers(response.data)
            } catch (error) {
                console.log('LỖi không thể lấy số lượng users', error)
            }
        };
        getSoLuongUsers();
    }, [])

    return (
        <div>
            <div>
                <Breadcrumb
                    items={[
                        {
                            title: 'Trang chủ',
                        },
                        {
                            title: 'Bảng điều khiển',
                        },

                    ]}
                    style={{
                        margin: '16px 0',
                    }}
                />
            </div>
            <div>
                <div className="tableTongSoLuong">
                    <div className="inTableTongSoLuong">
                        <div>
                            <h2 className="text-center">Tổng số lượng</h2>
                            <hr />
                        </div>
                        <div className="wrapperCardIn">
                            <div className="leftCardOne">
                                <div className="iconCardOne">
                                    <RiLuggageCartLine />
                                </div>
                                <div className="textCardOne">
                                    <p className="categoryCardOne">Số lượng: {soLuongProducts.products}</p>
                                </div>
                            </div>


                            <div className="rightCardTwo">
                                <div className="iconCardTwo">
                                    <FaUsers />
                                </div>
                                <div className="textCardTwo">
                                    <p className="categoryCardTwo"> Số lượng: {soLuongUsers.users}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <p>Total Products: {soLuongProducts.products}</p>
                    <p>Total Users: {soLuongUsers.users}</p> */}
                </div>
            </div>
        </div>
    )
}

export default BangDieuKhien