const Schemas = require('../models/schemas');

exports.getUsersData = async(req, res) =>{

const userTweets = await Schemas.Users.find({}).exec()
    if (userTweets) {
        res.end(JSON.stringify(userTweets));
    } else {
        res.end();
    }



}