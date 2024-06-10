const express = require('express');
const router = express.Router();
const Schemas = require('../models/schemas');

router.post('/user', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send('Name and email are required');
    }

    try {
        // Check if the email already exists
        const existingUser = await Schemas.Users.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        // If not exists, create a new user instance
        const newContact = new Schemas.Users({ name, email });

        // Save the new user to the database
        const saveContact = await newContact.save();

        res.send('Message sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/tweets', async (req, res) => {
    

    // this code will get all tweets
    //const userTweets = await tweets.find({}, (err, tweetData) => {

    // this code will get all tweets and join the user table
    const userTweets = await Schemas.Users.find({}).exec()
        if (userTweets) {
            res.end(JSON.stringify(userTweets));
        } else {
            res.end();
        }
    
});


module.exports = router;