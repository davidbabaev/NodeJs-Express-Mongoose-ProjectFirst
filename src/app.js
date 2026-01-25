const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const {createNewCard, getCards, getCard} = require('./cards/service/cardsSvc')

const PORT = 8181;

const connectToDB = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/newCardsData')
    }
    catch(err){
        console.log(err.message);
        
    }
}

app.get('/cards', async (req, res) => {
    try{
        const cards = await getCards();
        res.send(cards)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.get('/cards/:id', async (req, res) => {
    try{
        const card = await getCard(req.params.id); // -> dynamic!
        res.send(card)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.post('/cards', async (req, res) => {
    try{
        let newCard = await createNewCard(req.body)
        res.send(newCard)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log('listenign');
    connectToDB();
})