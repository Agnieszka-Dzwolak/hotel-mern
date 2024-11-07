import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import hashPassword from '../utils/hashPassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import validatePassword from '../utils/validatePassword.js';
import validateEmail from '../utils/validateEmail.js';
import validateUsername from '../utils/validateUsername.js';

import User from '../models/user.js';

const userControllers = {
    register: async (req, res) => {
        try {
            const { username, email, password, rePassword } = req.body;
            //check if user exists
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res
                    .status(400)
                    .json({ message: 'User already exists. Please login.' });
            }

            //validate email, password, username and check if passwords match
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
                //hash password
                const hashedPassword = hashPassword(password);

                //create a new user
                const newUser = new User({
                    username,
                    email,
                    password: hashedPassword
                });
                await newUser.save();
                res.status(201).json(newUser);
            } else {
                res.status(400).json({ message: 'Invalid email or password' });
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            //check if user exists
            const userExists = await User.findOne({ email });

            if (userExists) {
                //check passwords
                bcrypt.compare(
                    password,
                    userExists.password,
                    (err, isValid) => {
                        if (err) {
                            return res
                                .status(400)
                                .json({ message: err.message });
                        }

                        if (isValid) {
                            //create token
                            const token = jwt.sign(
                                { userExists },
                                process.env.TOKEN_SECRET
                            );

                            //create cookie
                            res.cookie('token', token, { httpOnly: true });

                            res.status(200).json({
                                id: userExists._id,
                                username: userExists.username,
                                message: 'User logged in successfully'
                            });
                        } else {
                            res.status(400).json({
                                message: 'Invalid credentials, please try again'
                            });
                        }
                    }
                );
            } else {
                res.status(400).json({
                    message: "User doesn't exist. Please register"
                });
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    },
    logout: async (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    }
};

export default userControllers;
