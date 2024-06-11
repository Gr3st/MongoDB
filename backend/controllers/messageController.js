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

exports.getChat = async(req, res) =>{
    
    

        // this code will get all tweets
        //const userTweets = await tweets.find({}, (err, tweetData) => {
    
        // this code will get all tweets and join the user table
    const userTweets = await Schemas.Users.find({}).exec()
        if (userTweets) {
            res.end(JSON.stringify(userTweets));
        } else {
            res.end();
        }
    
  
    
}