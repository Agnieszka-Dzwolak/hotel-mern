import Hotel from '../models/hotel.js';

const hotelControllers = {
    getAllHotels: async (req, res) => {
        try {
            const hotels = await Hotel.find();

            if (hotels.length === 0) {
                res.status(404).json({ message: 'No hotels found' });
            } else {
                res.status(200).json(hotels);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getHotel: async (req, res) => {
        const { id } = req.params;
        try {
            const hotel = await Hotel.findOne({ _id: id });
            if (hotel) {
                res.status(200).json(hotel);
            } else {
                res.status(404).json({ message: 'Hotel not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getUserHotels: async (req, res) => {
        const { id } = req.params;

        try {
            const hotels = await Hotel.find({ user_id: id });
            res.status(200).json(hotels);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createHotel: async (req, res) => {
        const { name, category, description, price, image, user_id } = req.body;
        try {
            if (name && category && description && price && image && user_id) {
                const newHotel = await Hotel.create({
                    name,
                    category,
                    description,
                    price,
                    image,
                    user_id
                });

                await newHotel.save();
                res.status(201).json(newHotel);
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    updateHotel: async (req, res) => {
        const { id } = req.params;
        const { name, category, description, price, image } = req.body;
        try {
            if (name && category && description && price && image) {
                const updatedHotel = await Hotel.updateOne(
                    { _id: id },
                    { name, category, description, price, image }
                );

                if (updatedHotel.modifiedCount === 0) {
                    res.status(404).json({ message: 'Hotel not updated' });
                } else {
                    res.status(200).json({ message: 'Hotel has been updated' });
                }
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteHotel: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedHotel = await Hotel.deleteOne({ _id: id });

            if (deletedHotel.deletedCount === 0) {
                return res
                    .status(404)
                    .json({ message: 'Hotel cannot be deleted' });
            } else {
                res.status(200).json({ message: 'Hotel deleted successfully' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default hotelControllers;
