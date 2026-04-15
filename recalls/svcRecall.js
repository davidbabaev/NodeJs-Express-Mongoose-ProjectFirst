const mongoose = require('mongoose');

const Message = require('./models/Message');
const Conversation = require('./models/Conversation');

const getChats = async (userId) => {
    const chats = await Conversation.find({
        $or:[
            {fromUser: userId},
            {toUser: userId},
        ]
    })
    return chats;
}

const getMessages = async (conversationId) => {
    const messages = await Message.find({conversationId})
    return messages;
}

const createNewMessage = async (message, userId) => {
    try{
        let newMessage = new Message({...message, userId})
        newMessage = await newMessage.save()
        return newMessage;
    }
    catch(err){
        throw err;
    }
}

const getChat = async (fromUserId, toUserId) => {
    const chat = await Conversation.findOne({
        $or:[
            {fromUser: fromUserId, toUser: toUserId},
            {fromUser: toUserId, toUser: fromUserId},
        ]
    });
    return chat
}