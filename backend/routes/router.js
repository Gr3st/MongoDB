const express = require('express');
const router = express.Router();
const Schemas = require('../models/schemas');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');
const userController = require('../controllers/userController');

router.post('/user',authController.register);
router.post('/login', authController.login);
router.post('/message', messageController.send);
router.get('/userChats', messageController.getChat);
router.get('/chat/:chatId/messages', messageController.getMessages);
router.get('/userData', userController.getUsersData);


// router.post('/user', async (req, res) => {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).send('Name and email are required');
//     }

//     try {
//         // Check if the email already exists
//         const existingUser = await Schemas.Users.findOne({ email: email });

//         if (existingUser) {
//             return res.status(400).send('User with this email already exists');
//         }

//         // If not exists, create a new user instance
//         const newContact = new Schemas.Users({ username, email, password });

//         // Save the new user to the database
//         const saveContact = await newContact.save();

//         res.send('Message sent');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });


module.exports = router;