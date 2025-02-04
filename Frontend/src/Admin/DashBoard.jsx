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
import { MdOutlineDeliveryDining } from "react-icons/md";
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, theme } from 'antd';
import './DashBoard.css';
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const DashBoard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const dropdownMenu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/dashboard/profile" style={{ textDecoration: 'none' }}><CgProfile style={{ fontSize: '16px', marginTop: '-3px' }} /> Profile  </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/logout" style={{ textDecoration: 'none' }}><MdLogout /> Logout </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <div className="in-logo">
                        <Link to='/dashboard' style={{ textDecoration: 'none', color: 'white' }}>QUẢN LÝ BÁN HÀNG</Link>
                    </div>
                    <hr />
                </div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {/* Bảng điều khiển */}
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>Bảng điều khiển</Link>
                    </Menu.Item>

                    {/* Mục sản phẩm */}
                    <SubMenu key="2" icon={<AppstoreOutlined />} title="Mục sản phẩm">
                        <Menu.Item key="2-1" icon={<EyeOutlined />}>
                            <Link to="/dashboard/xemsanPham" style={{ textDecoration: 'none' }}>Xem sản phẩm</Link>
                        </Menu.Item>
                        <Menu.Item key="2-2" icon={<PlusOutlined />}>
                            <Link to="/dashboard/taomoi" style={{ textDecoration: 'none' }}>Tạo mới</Link>
                        </Menu.Item>
                        <Menu.Item key="2-3" icon={<EditOutlined />}>
                            <Link to="/dashboard/chinhsua" style={{ textDecoration: 'none' }}>Chỉnh sửa</Link>
                        </Menu.Item>
                        <Menu.Item key="2-4" icon={<DeleteOutlined />}>
                            <Link to="/dashboard/xoasanpham" style={{ textDecoration: 'none' }}>Xóa</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Quản lý người dùng */}
                    <SubMenu key="3" icon={<TeamOutlined />} title="QL người dùng">
                        <Menu.Item key="3-1" icon={<FileSearchOutlined />}>
                            <Link to="/dashboard/xemthongtin" style={{ textDecoration: 'none' }}>Xem thông tin</Link>
                        </Menu.Item>

                        <Menu.Item key="3-4" icon={<DeleteOutlined />}>
                            <Link to="/dashboard/xoanguoidung" style={{ textDecoration: 'none' }}>Xóa người dùng</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* Mục khác */}

                    <Menu.Item key="5" icon={<MdShoppingCartCheckout style={{ fontSize: '17px' }} />}>
                        <Link to="/dashboard/qldonhang" style={{ textDecoration: 'none' }}>QL đơn hàng</Link>

                    </Menu.Item>

                    <Menu.Item key="4" icon={<MdOutlineDeliveryDining style={{ fontSize: '17px' }} />}>
                        <Link to="/dashboard/qlgiaohang" style={{ textDecoration: 'none' }}>QL giao hàng</Link>

                    </Menu.Item>
                    <Menu.Item key="6" icon={<MdOutlineSettings style={{ fontSize: '17px' }} />}>
                        <Link to="/dashboard/setting" style={{ textDecoration: 'none' }}>Cài đặt chung</Link>

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
                            <Dropdown overlay={dropdownMenu} placement="bottomRight" arrow>
                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <Avatar size="default" icon={<TeamOutlined />} />
                                    <span style={{ marginLeft: 8 }}>Tran Viet Chinh<MdOutlineArrowDropDown style={{ fontSize: '25px' }} /> </span>
                                </div>
                            </Dropdown>
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
