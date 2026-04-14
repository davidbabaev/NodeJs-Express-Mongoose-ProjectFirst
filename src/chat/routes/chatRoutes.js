const {
    getOrCreateConversation,
    createNewMessage,
    getMessages,
    getChats
} = require("../service/chatSvc");

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log("A user conncted:", socket.id);
        // all events go inside here

        socket.on('join-chat', (roomId) => {
            socket.join(roomId);
        });

        socket.on('send-message', async (data) => {
            const message = await createNewMessage(data, data.userId)
            io.to(data.conversationId).emit('recieve-message', message)
        });

        socket.on('get-chats', async (userId) => {
            const chats = await getChats(userId);
            socket.emit('chats-list', chats);
        });

    });
}
