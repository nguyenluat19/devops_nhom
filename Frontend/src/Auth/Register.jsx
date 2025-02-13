import { useState } from "react";

import styles from "./styleAuth.module.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Layout from "../components/Layout/Layout";



const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3000/api/v2/register", {
                name,
                email,
                password,
                phone,
                address,
                gender
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login")
            } else {
                console.log("Error: ", res.data.message);
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    };


    return (
        <Layout title={"register"}>
            <div className={styles.Register}>
                <form className={styles.RegisterForm} onSubmit={handleSubmit}>
                    <h2>Trang đăng ký</h2>
                    <div className={styles.formGroup}>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required=""
                        />
                    </div>
                    <div className={styles.formGroup}>

                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>

                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>

                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="What is your gender?"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.RegisterButton}>
                        Đăng ký
                    </button>
                    <div className="form-footer">
                        <p>
                            Already have an account? <a href="#">Login here</a>
                        </p>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Register;
