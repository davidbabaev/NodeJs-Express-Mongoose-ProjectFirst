const {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats
} = require('../service/chatSvc');


module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('get-chats', async (userId) => {
            const chats = await getChats(userId);
            socket.emit('recieve-chats', chats)
        });

        // NEW: when a user identifies themselves, join their personal room
        socket.on('register-user', (userId) => {
            socket.join(userId);
        });
        
        socket.on('send-message', async (message, userId) => {
            const conversation = await getOrCreateConversation(userId, message.toUser)
            const newMessage = await createNewMessage(
                {...message, conversationId: conversation._id}, userId
            )
            // io.emit('recieve-message', newMessage) <-- send to everyone connected the app
            
            // io.to(conversation._id.toString()).emit('recieve-message', newMessage)

            // emit to BOTH:
            // the sender's room AND the recipient's room
            io.to(userId).to(message.toUser).emit('recieve-message', newMessage);

        })

        socket.on('get-messages', async (conversationId) => {
            // socket.join(conversationId);
            const messages = await getMessages(conversationId);
            socket.emit('recieve-messages', messages)
        })
    })
}