// const mongoose = require('mongoose');
// const express = require('express');

// const { createNewCard, getCards, getCard } = require('../src/cards/service/cradsSvcRecall')

// const app = express();
// app.use(express.json());
// const PORT = 8181;

// const connectToDB = async () => {
//     try{
//         await mongoose.connect('mongodb://127.0.0.1:27017/newCardsData')
//     }   
//     catch(err){
//         console.log(err.message);
//     }
// }

// // get one card
// app.get('/cards/:id', async (req, res) => {
//     try{
//         const card = await getCard(req.params.id);
//         res.send(card)
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// // get cards
// app.get('/cards', async (req, res) => {
//     try{
//         const cards = await getCards();
//         res.send(cards)
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// // create new crad
// app.post('/cards', async (req, res) => {
//     try{
//         let createCard = await createNewCard(req.body);
//         res.send(createCard);
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// app.listen(PORT, () => {
//     console.log('listening..');
//     connectToDB()
// })