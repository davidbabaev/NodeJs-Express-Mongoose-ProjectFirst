const {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats
} = require('../service/chatSvc');

const jwt = require('jsonwebtoken')


module.exports = (io) => {
    // middleware: runs once per socket, before "connection" event
    io.use((socket, next) => {
        const token = socket.handsShake.auth.token;

        if(!token){
            return next(new Error('No token provided'))
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            socket.userId = decoded._id;
            next();
        }
        catch(err){
            next(new Error('invelid token'))
        }
    })

    io.on('connection', (socket) => {

        socket.join(socket.userId)

        socket.on('send-message', async (message) => {
            const userId = socket.userId;

            const conversation = await getOrCreateConversation(userId, message.toUser)
            const newMessage = await createNewMessage(
                {...message, conversationId: conversation._id}, userId
            )
            io.to(userId).to(message.toUser).emit('recieve-message', newMessage);
        })

        socket.on('get-chats', async () => {
            const chats = await getChats(socket.userId);
            socket.emit('recieve-chats', chats)
        });

        socket.on('get-messages', async (conversationId) => {
            // socket.join(conversationId);
            const messages = await getMessages(conversationId);
            socket.emit('recieve-messages', messages)
        })
    })
}












/* const {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats
} = require('../service/chatSvc');

const jwt = require('jsonwebtoken');

module.exports = (io) => {
    // on the second place we need to have use with jwt check?
    //on the first place we need to chet which user is connected?

    io.on('connection', (socket) => {

    })
}
 */

















