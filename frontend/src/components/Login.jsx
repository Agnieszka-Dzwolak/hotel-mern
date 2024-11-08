import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            if (email && password) {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/login`,
                    { email, password },
                    { withCredentials: true }
                );
                if (res.status === 200) {
                    sessionStorage.setItem('id', res.data.id);
                    sessionStorage.setItem('username', res.data.username);
                    navigate('/');
                    window.location.reload();
                } else {
                    setError('Invalid inputs');
                }
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1 className="title-login">Login Form</h1>

            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
