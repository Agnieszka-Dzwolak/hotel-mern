import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import './AddHotel.css';

const AddHotel = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (name && category && description && price && image) {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/hotels`,
                    {
                        name,
                        category,
                        description,
                        price,
                        image,
                        user_id: sessionStorage.getItem('id')
                    },
                    { withCredentials: true }
                );

                if (res.status === 201) {
                    navigate('/');
                } else {
                    setError('Error in adding data');
                }
            } else {
                setError('All fields are required');
            }
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className="add-hotel">
            <form onSubmit={submitHandler}>
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
                <button type="submit">Add Hotel</button>
            </form>
        </div>
    );
};

export default AddHotel;
