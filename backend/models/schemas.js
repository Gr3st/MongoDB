const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String, required: true},
    surname: {type:String, required: true},
    username: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    entryDate: {type:Date, default:Date.now}
})

const messageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const privateChatSchema = new Schema({
    user1Id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    user2Id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    createdAt: { type: Date, default: Date.now }
});


// const contactSchema = new Schema({
//     name: {type:String, required: true},
//     email: {type:String, required: true},
//     entryDate: {type:Date, default:Date.now}
// })

const Users = mongoose.model('Users',userSchema,'users');
const Message = mongoose.model('Message',messageSchema,'messages');
const PrivateChat = mongoose.model('PrivateChat',privateChatSchema,'privateChats');
// const Contact = mongoose.model('Contact',contactSchema,'contact_form');
const mySchemas = {'Users':Users, 'Message':Message, 'PrivateChat': PrivateChat}

module.exports = mySchemas;
