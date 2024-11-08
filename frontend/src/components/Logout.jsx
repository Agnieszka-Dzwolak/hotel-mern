import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/logout`,
                    {},
                    { withCredentials: true }
                );

                if (res.status === 200) {
                    sessionStorage.removeItem('id');
                    sessionStorage.removeItem('username');
                    navigate('/');
                    window.location.reload();
                }
            } catch (err) {
                console.error(err);
            }
        };
        logout();
    }, [navigate]);
    return <div>Logout</div>;
};

export default Logout;
