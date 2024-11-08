import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import './Hotel.css';

const Hotel = ({ hotel }) => {
    const navigate = useNavigate();
    const [canChange, setCanChange] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = sessionStorage.getItem('id');
        if (hotel.user_id === userId) {
            setCanChange(true);
        } else {
            setCanChange(false);
        }
    }, [hotel.user_id]);

    const deleteHandler = async (_id) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_API_URL}/hotels/${_id}`,
                { withCredentials: true }
            );
            if (res.status === 200) {
                window.location.reload();
            } else {
                setError('Error in deleting hotel');
            }
        } catch (err) {
            console.error(err.message);
            setError('Error in deleting hotel');
        }
    };

    const editHandler = async (_id) => {
        navigate(`/edit/${_id}`);
    };

    return (
        <div className="hotel-container">
            <div className="img-container">
                <img src={hotel.image} alt={hotel.name} />
            </div>
            <div className="hotel-details">
                <h2>{hotel.name}</h2>
                <p>{hotel.category}</p>
                <p>{hotel.description}</p>
                <p>${hotel.price}</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            {canChange && (
                <div className="buttons-container">
                    <button
                        onClick={() => editHandler(hotel._id)}
                        className="edit-button"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteHandler(hotel._id)}
                        className="delete-button"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

Hotel.propTypes = {
    hotel: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired
    })
};

export default Hotel;
