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

    }
    catch(err){
        handleError(res, err)
    }
})