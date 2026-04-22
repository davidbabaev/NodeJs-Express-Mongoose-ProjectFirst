/* const {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats
} = require('../service/chatSvc');

const jwt = require('jsonwebtoken')


module.exports = (io) => {
    // middleware: runs once per socket, before "connection" event
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

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
} */












const {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats
} = require('../service/chatSvc');

const jwt = require('jsonwebtoken');

module.exports = (io) => {
    // verify JWT here
    // if bad: disconnect them
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if(!token) return next(new Error('No token provided'))

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.userId;
            socket.isAdmin = decoded.isAdmin;

            next();
        }
        catch(err){
            return next(new Error('Invalid token'))
        }
    })

    io.on('connection', (socket) => {
        socket.join(socket.userId) // <- join personal room immediately on connect

        socket.on('send-message', async (message) => {
            const conversation = await getOrCreateConversation(socket.userId, message.toUser)

            const newMessage = await createNewMessage(
                {...message, conversationId: conversation._id},
                socket.userId
            )

            io.to(socket.userId).to(message.toUser).emit('receive-message', newMessage)
        })
    })
}


















