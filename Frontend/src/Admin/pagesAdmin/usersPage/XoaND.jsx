import { Breadcrumb } from "antd"
import axios from "axios";
import './styleUser.css'
import { useEffect, useState } from "react"
import { FaThList } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


const XoaND = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v2/users');
                setUsers(response.data)
            } catch (error) {
                console.log('Loi khong lay duoc tat ca user', error);

            }
        };
        getAllProducts();
    })

    // const deleteUser = async
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
                            title: 'Xóa người dùng'
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
                                <th scope="col">Hành động</th>
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
                                        <td>
                                            <div className="buttonXoaND">
                                                <RiDeleteBin6Line style={{ fontSize: '18px', textAlign: 'center', color: '#FF0000' }} />
                                                {/* <p>Xóa</p> */}
                                            </div>
                                        </td>

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

export default XoaND