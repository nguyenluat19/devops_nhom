import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout"
import { useAuth } from "../context/auth";
import styles from './styles/Profile.module.css'
import { LuPenLine } from "react-icons/lu";

const ProfileUser = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    return (
        <Layout title={'Profile User'}>
            <div className={styles.profileUser}>
                <div className={styles.inProfileUser}>
                    <div className={styles.leftProfileUser}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" />
                        <h4>{auth.user.name}</h4>
                        <div>{auth.user.address}</div>

                    </div>
                    <div className={styles.rightProfileUser}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Thông tin cá nhân</h3>
                            <div style={{ fontSize: '22px', cursor: 'pointer' }} onClick={() => navigate("/update-profile")}>
                                <LuPenLine />
                            </div>
                        </div>
                        <div className={styles.inRightProfileUser}>
                            <div>Hoj và tên:</div>
                            <div>{auth.user.name}</div>
                        </div>
                        <hr />
                        <div className={styles.inRightProfileUser}>
                            <div>Email:</div>
                            <div>{auth.user.email}</div>
                        </div>
                        <hr />
                        <div className={styles.inRightProfileUser}>
                            <div>Số điện thoại:</div>
                            <div>{auth.user.phone}</div>
                        </div>
                        <hr />
                        <div className={styles.inRightProfileUser}>
                            <div>Giới tính:</div>
                            <div>{auth.user.gender}</div>
                        </div>
                        <hr />
                        <div className={styles.inRightProfileUser}>
                            <div>Địa chỉ:</div>
                            <div>{auth.user.address}</div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default ProfileUser
