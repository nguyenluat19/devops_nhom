import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import Layout from '../components/Layout/Layout';
import styles from './styleAuth.module.css';
import toast from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API;


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/v2/login`, { email, password });
            if (res.data.token) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/');
            } else {
                // alert(res.data.message);
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Đăng nhập thất bại')
        }
    };

    return (
        <Layout title={'login'}>
            <form onSubmit={handleSubmit} className={styles.Login}>
                <h2>Trang đăng nhập</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Đăng nhập</button>
            </form>
        </Layout>
    );
};

export default Login;