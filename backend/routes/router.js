const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');

router.post('/contact',async (req,res)=>{
    // const {id, name} = req.body;
    const contactData = {name: name, email: email};
    const newContact = new Schemas.Contact(contactData);
    const saveContact = await newContact.save();
    if (saveContact) {
        res.send('Message sent');
    }
    res.end();
})
router.get('/tweets', async (req, res) => {
    

    // this code will get all tweets
    //const userTweets = await tweets.find({}, (err, tweetData) => {

    // this code will get all tweets and join the user table
    const userTweets = await schemas.Users.find({}).populate("user").exec((err, tweetData) => {
        if (err) throw err;
        if (tweetData) {
            res.end(JSON.stringify(tweetData));
        } else {
            res.end();
        }
    });
});


module.exports = router;