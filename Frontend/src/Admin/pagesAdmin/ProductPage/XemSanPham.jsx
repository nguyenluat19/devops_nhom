import { useEffect, useState } from 'react';
import { Table, Breadcrumb, Image } from 'antd';
import axios from 'axios';
import { FiEdit3 } from "react-icons/fi";
// import Link from 'antd/es/typography/Link';
import { Link } from 'react-router-dom';
// import Loading from '../Loading';

const XemSanPham = () => {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/products');

                setProducts(response.data)
                // setLoading(false);
            } catch (error) {
                console.log('Lỗi trong khi getAllProduct', error);

            }
        };
        getAllProducts();
    }, [])

    // if (loading) {
    //     return <Loading />
    // }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
            render: (anh, record, index) => index + 1,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'name',
            render: (anh) => <Image src={anh} alt="Product" style={{ width: 50, height: 50, objectFit: 'cover' }} />
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => {
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(price);
            },
        },
        {
            title: 'Giá gốc',
            dataIndex: 'priceGoc',
            key: 'price',
            render: (priceGoc) => {
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(priceGoc);
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            render: (discount) => `${discount}%`,
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => `${rating} sao`
        },
        {
            title: 'Ảnh chi tiết',
            dataIndex: 'detailImage',
            key: 'detailImage',
            render: (image) => (
                <Image src={image} alt="Product Detail" style={{ width: 50, height: 50, objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <Link className='btn btn-warning ' to={`/dashboard/chinhsua/${record._id}`}>
                    <FiEdit3 />
                </Link>
            )
        }


    ];

    return (
        <div>
            <div>
                <Breadcrumb
                    items={[
                        { title: 'Trang chủ' },
                        { title: 'Mục sản phẩm' },
                        { title: 'Xem sản phẩm' },
                    ]}
                    style={{ margin: '16px 0' }}
                />
            </div>

            <Table
                dataSource={products} // Cấp dưu liêuj cho bảngbảng
                columns={columns} // cấu hình cột 
                rowKey="id" // id là khóa duy nhất cho mỗi hàng
                pagination={{ pageSize: 5 }} // Cấu hình phân trang 
            />
        </div>
    );
};

export default XemSanPham;
