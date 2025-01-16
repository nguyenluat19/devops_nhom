import { useState } from 'react';
import {
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    TeamOutlined,
    AppstoreOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    FileSearchOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row, theme } from 'antd';
import './DashBoard.css';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const DashBoard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <div className="in-logo">QUẢN LÝ BÁN HÀNG</div>
                    <hr />
                </div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {/* Bảng điều khiển */}
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link to="/" style={{ textDecoration: 'none' }}>Bảng điều khiển</Link>
                    </Menu.Item>

                    {/* Mục sản phẩm */}
                    <SubMenu key="2" icon={<AppstoreOutlined />} title="Mục sản phẩm">
                        <Menu.Item key="2-1" icon={<EyeOutlined />}>
                            <Link to="/xemsanPham" style={{ textDecoration: 'none' }}>Xem sản phẩm</Link>
                        </Menu.Item>
                        <Menu.Item key="2-2" icon={<PlusOutlined />}>
                            <Link to="/taomoi" style={{ textDecoration: 'none' }}>Tạo mới</Link>
                        </Menu.Item>
                        <Menu.Item key="2-3" icon={<EditOutlined />}>
                            <Link to="/chinhsua" style={{ textDecoration: 'none' }}>Chỉnh sửa</Link>
                        </Menu.Item>
                        <Menu.Item key="2-4" icon={<DeleteOutlined />}>
                            <Link to="xoasanpham" style={{ textDecoration: 'none' }}>Xóa</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Quản lý người dùng */}
                    <SubMenu key="3" icon={<TeamOutlined />} title="QL người dùng">
                        <Menu.Item key="3-1" icon={<FileSearchOutlined />}>
                            <Link to="/xemthongtin" style={{ textDecoration: 'none' }}>Xem thông tin</Link>
                        </Menu.Item>

                        <Menu.Item key="3-4" icon={<DeleteOutlined />}>
                            <Link to="xoanguoidung" style={{ textDecoration: 'none' }}>Xóa người dùng</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Mục khác */}
                    <Menu.Item key="4" icon={<DashboardOutlined />}>
                        Thống kê
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Row>
                        <Col md={21}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '20px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col md={3}>
                            <div>
                                <Avatar size="default" icon={<TeamOutlined />} />
                                Tran Viet Chinh
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashBoard;
