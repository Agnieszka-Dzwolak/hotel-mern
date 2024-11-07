import express from 'express';

import hotelControllers from '../controllers/hotel.js';
import verifyToken from '../middleware/verifyToken.js';

const {
    getAllHotels,
    getHotel,
    getUserHotels,
    createHotel,
    updateHotel,
    deleteHotel
} = hotelControllers;

const router = express.Router();

// routes
router.get('/hotels', getAllHotels);
router.get('/hotels/:id', getHotel);
router.get('/hotels/user/:id', verifyToken, getUserHotels);
router.post('/hotels', verifyToken, createHotel);
router.put('/hotels/:id', verifyToken, updateHotel);
router.delete('/hotels/:id', verifyToken, deleteHotel);

export default router;
