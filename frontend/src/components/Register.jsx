import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.css';

import validateUsername from '../../utils/validateUsername';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import matchPasswords from '../../utils/matchPasswords';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        //validate username, email and password and check if password and rePassword match
        const isValidUsername = validateUsername(username);
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const doPasswordsMatch = matchPasswords(password, rePassword);

        if (
            isValidUsername &&
            isValidEmail &&
            isValidPassword &&
            doPasswordsMatch
        ) {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/register`,
                    { username, email, password, rePassword },
                    { withCredentials: true }
                );

                if (res.status === 201) {
                    navigate('/login');
                    window.location.reload();
                } else {
                    setError('Invalid inputs');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <h1 className="title-form">Register Form</h1>
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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

                <label htmlFor="rePassword">Confirm password:</label>
                <input
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    required
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />

                {error && <div className="error-message">{error}</div>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
