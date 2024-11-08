import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Hotel from './Hotel';
import Header from './Header';
import Loading from './Loading';

import capitalize from '../../utils/capitalize.js';

import './Hotels.css';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getHotels = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/hotels`
                );

                if (res.status === 200) {
                    setHotels(res.data);
                } else {
                    setError('Error fetching data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getHotels();

        const username = sessionStorage.getItem('username');
        if (username) {
            setUsername(username);
        } else {
            setUsername('');
        }
    }, []);
    return (
        <div>
            <Header title="Hotels" />
            <div className="hotels-container">
                {loading && <Loading />}

                {username && (
                    <div className="welcome-message">
                        Welcome {capitalize(username)}
                    </div>
                )}

                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <Hotel key={hotel._id} hotel={hotel} />
                    ))
                ) : (
                    <div className="no-hotel">No hotel found</div>
                )}

                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default Hotels;
