import { Breadcrumb } from "antd"
import axios from "axios";
import { useEffect, useState } from "react"
import './styleUser.css'
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";
import { Link } from "react-router-dom"
import { GrLinkNext } from "react-icons/gr";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const BangDieuKhien = () => {
    const [soLuongProducts, setSoLuongProducts] = useState({ products: 0 });
    const [soLuongUsers, setSoLuongUsers] = useState({ User: 0 });

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

    const data = [
        { name: 'Sản phẩm A', uv: 6000 },
        { name: 'Sản phẩm B', uv: 4398 },
        { name: 'Sản phẩm C', uv: 9800 },
    ];
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
            <div className="containerDashboard">
                {/* <h2 className="text-center">Tổng chi tiết</h2> */}
                <div className="flexChiTiet">
                    <div className="chiTietLeft">
                        <div className="leftIcon">
                            <MdOutlineShoppingCartCheckout />
                        </div>
                        <div className="textLeft">
                            <h4>Tổng sản phẩm: ({soLuongProducts.products})</h4>
                            <Link to='/dashboard/xemsanPham' style={{ textDecoration: 'none' }}>Xem chi tiết  <GrLinkNext /></Link>
                        </div>

                    </div>
                    <div className="chiTietRight">

                        <div className="rightIcon">
                            <PiUsersFourLight />
                        </div>
                        <div className="textRight text-center">
                            <h4>Tổng người dùng: ({soLuongUsers.User})</h4>
                            <Link to='/dashboard/xemthongtin' style={{ textDecoration: 'none' }}>Xem chi tiết <GrLinkNext /></Link>

                        </div>
                    </div>
                </div>


                <div className="flexDuoi mt-5">
                    <div className="flexLeft">
                        <BarChart width={500} height={350} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="uv" fill="#8884d8" />
                        </BarChart>
                    </div>
                    <div className="flexRight">
                        <div style={{ width: "100%", height: "350px", border: "1px solid #ddd" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.643765917889!2d108.1856982!3d16.0646945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219005b1da607%3A0x9092a3e383656014!2s18%20Ph%E1%BA%A1m%20Nh%E1%BB%AF%20T%C4%83ng%2C%20H%C3%B2a%20Kh%C3%AA%2C%20Thanh%20Kh%C3%AA%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20550000%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1sen!2s!4v1699266097438!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: "0" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BangDieuKhien

{/* <p>Total Products: {soLuongProducts.products}</p>
                    <p>Total Users: {soLuongUsers.users}</p> */}