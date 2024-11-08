import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import './EditHotel.css';

const EditHotel = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getHotel = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/hotels/${id}`
                );

                if (res.status === 200) {
                    setName(res.data.name || '');
                    setCategory(res.data.category || '');
                    setDescription(res.data.description || '');
                    setPrice(res.data.price || 0);
                    setImage(res.data.image || '');
                } else {
                    setError('Something went wrong');
                }
            } catch (err) {
                console.error('Something went wrong');
                setError(err.message);
            }
        };
        getHotel();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (name && category && description && price && image) {
                const res = await axios.put(
                    `${import.meta.env.VITE_API_URL}/hotels/${id}`,
                    { name, description, category, price, image },
                    { withCredentials: true }
                );
                if (res.status === 200) {
                    navigate('/');
                } else {
                    setError('Error in updating the hotel');
                }
            } else {
                setError('All fields are required');
            }
        } catch (err) {
            console.error('Something went wrong');
            setError(err.message);
        }
    };

    return (
        <div className="edit-hotel">
            <form onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="price">Price: $</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Edit Hotel</button>
            </form>
        </div>
    );
};

export default EditHotel;
