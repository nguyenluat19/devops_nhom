import { useEffect, useState } from 'react';
import { Table, Breadcrumb, Image } from 'antd';
import axios from 'axios';

const XemSanPham = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/products');

                setProducts(response.data)
            } catch (error) {
                console.log('Lỗi trong khi getAllProduct', error);

            }
        };
        getAllProducts();
    }, [])

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
