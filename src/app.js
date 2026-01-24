const mongoose = require('mongoose');
const express = require('express');
const {createNewCard, getCards} = require('../src/service/cardsSvc')

const app = express()
app.use(express.json());

const PORT = 8181;

app.get('/cards', async (req, res) => {
    try{
        let cards = await getCards(); // get cards from database
        res.send(cards);
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

const connectToMongoDB = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/newCardsData')
    }
    catch(err){
        console.log('mongoDB connection error: ', err.message);
    }
}

app.post('/cards', async (req, res) => {
    try{
        let card = await createNewCard(req.body)
        res.send(card)
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

app.listen(PORT, () => {
    console.log('server running on port ' + PORT);
    connectToMongoDB();
})