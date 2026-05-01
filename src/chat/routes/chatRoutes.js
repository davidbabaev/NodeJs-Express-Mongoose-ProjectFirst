const express = require('express')
const router = express.Router();
const {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats,
    deleteChat
} = require('../service/chatSvc');
const auth = require('../../auth/authService');
const { handleError } = require('../../utils/handleErrors');
const {upload} = require('../../middlewares/multer');
const uploadToCloudinary = require('../../utils/cloudinary');
const Conversation = require('../models/Conversation');

module.exports = (io) => {
    router.get('/chats', auth, async (req,res) => {
        try{
            const chats = await getChats(req.user.userId);
            res.send(chats)
        }
        catch(err){
            handleError(res, err);
        }
    })
    
    router.get('/messages/:conversationId', auth ,async (req,res) => {
        try{
            const messages = await getMessages(req.params.conversationId);
            res.send(messages)
        }
        catch(err){
            handleError(res, err);
        }
    })
    
    router.delete('/chats/:conversationId', auth, async (req, res) => {
        try{
            const deletedChat = await deleteChat(req.user.userId, req.params.conversationId);

            const otherUserId = deletedChat.fromUser.toString() === req.user.userId 
                ? deletedChat.toUser
                : deletedChat.fromUser 

            console.log('emitting deleted-conversation to:', otherUserId.toString())
            io.to(otherUserId.toString()).emit('deleted-conversation', deletedChat._id)

            res.send(deletedChat)
        }
        catch(err){
            handleError(res, err);
        }
    })

    router.post('/chat/upload-media', auth, upload.single('media'), async (req, res) => {
        try{
            if(!req.file) return res.status(400).send('File not found');

            const mediaUrl = await uploadToCloudinary(req.file.buffer, "messages");
            let newMessage = await createNewMessage(
                {
                    ...req.body,
                    mediaUrl: mediaUrl,
                    mediaType: req.file.mimetype.startsWith("image/") ? "image" : "video"
                },
                req.user.userId
            );

            const conversation = await Conversation.findById(newMessage.conversationId)

            const otherUser = 
            conversation.toUser.toString() === newMessage.userId.toString() 
            ? conversation.fromUser // toUser is me, so other user is fronUser
            : conversation.toUser; // toUser is them, so other it toUser

            io.to(newMessage.userId.toString()).to(otherUser.toString()).emit('receive-message', newMessage)

            res.send(newMessage);
        }
        catch(err){
            handleError(res, err)
        }
    })

    return router;
}