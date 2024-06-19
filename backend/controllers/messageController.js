const Schemas = require('../models/schemas');

exports.send = async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    if (!content) {
        return res.status(400).send('All fields are required!');
    }

    try {
        // Check if a private chat already exists between the two users
        let privateChat = await Schemas.PrivateChat.findOne({
            $or: [
                { user1Id: senderId, user2Id: receiverId },
                { user1Id: receiverId, user2Id: senderId }
            ]
        });

        if (!privateChat) {
            // If no chat exists, create a new one
            privateChat = new Schemas.PrivateChat({ user1Id: senderId, user2Id: receiverId });
            await privateChat.save();
        }

        // Create and save the new message
        const newMessage = new Schemas.Message({ senderId, receiverId, content });
        await newMessage.save();

        res.send('Message sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getChat = async (req, res) => {
    const { userId } = req.query;

    try {
        const privateChats = await Schemas.PrivateChat.find({
            $or: [{ user1Id: userId }, { user2Id: userId }]
        }).populate('user1Id user2Id').exec();

        res.json(privateChats);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await Schemas.PrivateChat.findById(chatId);
        if (!chat) {
            return res.status(404).send('Chat not found');
        }

        const messages = await Schemas.Message.find({
            $or: [
                { senderId: chat.user1Id, receiverId: chat.user2Id },
                { senderId: chat.user2Id, receiverId: chat.user1Id }
            ]
        }).sort({ timestamp: 1 }).exec();

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.getLastMessage = async (req, res) => {
    const userId = parseInt(req.params.userId); // ID użytkownika
  
    try {
      // Znajdź ostatnie wiadomości dla każdego czatu, w którym jest użytkownik o ID 2
      const lastMessages = await Schemas.Message.aggregate([
        { 
          $match: {
            $or: [
              { senderId: userId },
              { receiverId: userId }
            ]
          }
        },
        {
          $sort: { timestamp: -1 }
        },
        {
          $group: {
            _id: { $cond: [{ $eq: ['$senderId', userId] }, '$receiverId', '$senderId'] },
            message: { $first: '$$ROOT' }
          }
        }
      ]);
  
      res.json(lastMessages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
};
  