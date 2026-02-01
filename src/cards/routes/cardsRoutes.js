// this file will hold your app.get, app.post etc. for cards

const express = require('express');
const router = express.Router();

const {
    createNewCard, 
    getCards, 
    getCard, 
    updateCard, 
    deleteCard, 
    likeCard,
} = require('../service/cardsSvc');
const auth = require('../../auth/authService');

router.get('/cards', async (req, res) => {
    try{
        const cards = await getCards();
        res.send(cards);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.get('/cards/:id',async (req, res) => {
    try{
        const card = await getCard(req.params.id); // -> dynamic!
        res.send(card);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.post('/cards', auth, async (req, res) => {
    try{
        let newCard = await createNewCard(req.body);
        res.send(newCard);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.put('/cards/:id', auth, async (req, res) => {
    try{
        let updatedCard = await updateCard(req.params.id, req.body);
        res.send(updatedCard);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.delete('/cards/:id', auth, async (req, res) => {
    try{
        let deletedCard = await deleteCard(req.params.id);
        res.send(deletedCard);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.patch('/cards/:id', auth, async (req, res) => {
    try{
        let card = await likeCard(req.params.id, req.body.userId)
        res.send(card)
    }
    catch(err){
        res.status(400).send(err.message);
    }
})



module.exports = router;