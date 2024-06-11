const Schemas = require('../models/schemas');

exports.send = async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    if (!content) {
        return res.status(400).send('All fields are required!');
    }

    try {
        // Create a new message instance
        const newMessage = new Schemas.Message({ senderId, receiverId, content });

        // Save the new message to the database
        await newMessage.save();

        res.send('Message sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
