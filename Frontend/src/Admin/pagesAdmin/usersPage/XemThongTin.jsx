import { Breadcrumb } from "antd"
import { FaThList } from "react-icons/fa";
import './styleUser.css'
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API;


const XemThongTin = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v2/users`)

                setUsers(response.data)
            } catch (error) {
                console.log('Lỗi không thể lấy dữ liệu', error);

            }
        };
        getAllUser();
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
                            title: 'QL người dùng',
                        },
                        {
                            title: 'Xem thông tin'
                        }

                    ]}
                    style={{
                        margin: '16px 0',
                    }}
                />
            </div>

            <div className="danhSachQL">
                <div className="danhSachNGuoiDung">
                    <div className="danhSachNGuoiDungIn">
                        <FaThList /> Danh sách người dùng hệ thống
                    </div>
                </div>
                <div className="bangDanhSach">
                    <table className="table table-bordered" style={{ zIndex: '100', marginTop: '15px' }}>
                        <thead>


                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Số DT</th>
                                <th scope="col">Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        {/* <td>
                   
                </td> */}

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default XemThongTin