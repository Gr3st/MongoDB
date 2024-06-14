const Schemas = require('../models/schemas');
exports.register = async (req, res) => {
    const { name, surname, username, email, password } = req.body;

    if (!name || !surname || !username || !email || !password) {
        return res.status(400).send('Name and email are required');
    }

    try {
        // Check if the email already exists
        const existingUser = await Schemas.Users.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        // If not exists, create a new user instance
        const newContact = new Schemas.Users({ name, surname, username, email, password });

        // Save the new user to the database
        const saveContact = await newContact.save();

        res.send('Message sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Check if the user exists
        const existingUser = await Schemas.Users.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).send('User with this email does not exist');
        }

        // Check if the password is correct
        const isPasswordValid = await existingUser.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }

        // If user exists and password is correct, you can consider the user logged in
        res.send('User logged in successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
