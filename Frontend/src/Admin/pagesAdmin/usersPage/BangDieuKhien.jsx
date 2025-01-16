import { Breadcrumb } from "antd"


const BangDieuKhien = () => {
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
            BangDieuKhien
        </div>
    )
}

export default BangDieuKhien