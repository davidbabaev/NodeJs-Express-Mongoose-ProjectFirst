const express = require('express')
const router = express.Router();
const {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats
} = require('../service/chatSvc');
const auth = require('../../auth/authService');
const { handleError } = require('../../utils/handleErrors');

router.get('/chats', auth, async (req,res) => {
    try{
        const chats = await getChats(req.user.userId);
        res.send(chats)
    }
    catch(err){
        handleError(res, err)
    }
})

router.get('/messages/:conversationId', auth ,async (req,res) => {
    try{
        const messages = await getMessages(req.params.conversationId);
        res.send(messages)
    }
    catch(err){
        handleError(res, err)
    }
})

module.exports = router;