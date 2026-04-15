// const {
//     getOrCreateConversation,
//     createNewMessage,
//     getMessages,
//     getChats
// } = require('../src/chat/service/chatSvc');


// module.exports = (io) => {
//     io.on('connection', (socket) => {
//         socket.on('get-chats', async (userId) => {
//             const chats = await getChats(userId);
//             socket.emit('recieve-chats', chats)
//         });

//         socket.on('send-message', async (message, userId) => {
//             const conversation = await getOrCreateConversation(userId, message.toUser)
//             const newMessage = await createNewMessage(
//                 {...message, conversationId: conversation._id}, userId
//             )
//             io.emit('recieve-message', newMessage)
//         })

//         socket.on('get-messages', async (conversationId) => {
//             const messages = await getMessages(conversationId);
//             socket.emit('recieve-messages', messages)
//         })
//     })
// }