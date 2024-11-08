import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Hotels from './components/Hotels';
import AddHotel from './components/AddHotel';
import EditHotel from './components/EditHotel';

import './App.css';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Hotels />} />
                <Route path="/add" element={<AddHotel />} />
                <Route path="/edit/:id" element={<EditHotel />} />
                <Route />
            </Routes>
        </div>
    );
};

export default App;
