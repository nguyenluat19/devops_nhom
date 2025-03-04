import { Breadcrumb } from "antd"


const XemComment = () => {
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
                            title: 'Xem comment'
                        }

                    ]}
                    style={{
                        margin: '16px 0',
                    }}
                />
            </div>
            <div>
                <h1>helloo</h1>
            </div>
        </div>
    )
}

export default XemComment
