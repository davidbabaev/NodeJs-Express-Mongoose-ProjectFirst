const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const createError = require('../../utils/handleErrors');

const getOrCreateConversation = async (fromUserId, toUserId) => {
    const conversation = await Conversation.findOne({
        $or: [
            {fromUser: fromUserId, toUser: toUserId},
            {fromUser: toUserId, toUser: fromUserId},
        ]
    });
    if(!conversation){
        let newConversation = new Conversation({fromUser: fromUserId, toUser: toUserId})
        newConversation = await newConversation.save();
        return newConversation
    }
    return conversation;
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

const getMessages = async (conversationId) => {
    const messages = await Message.find({conversationId}).sort({createdAt: 1})
    // smae as: { conversationId: conversationId }
    return messages;
}

const getChats = async (userId) => {
    const chats = await Conversation.find({
        $or: [
            {fromUser: userId},
            {toUser: userId}
        ]
    }).sort({updatedAt: -1});
    return chats;
}

module.exports = {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats
}
