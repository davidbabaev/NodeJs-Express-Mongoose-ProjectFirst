// this file will hold your app.get, app.post etc. for cards

const express = require('express');
const router = express.Router();
const {handleError} = require('../../utils/handleErrors')
const joiSchema = require('../validation/Joi/validateCardsWithJoi');

const {
    createNewCard, 
    getCards, 
    getCard, 
    updateCard, 
    deleteCard, 
    likeCard,
} = require('../service/cardsSvc');
const auth = require('../../auth/authService');
const normalizeCard = require('../helpers/normalizeCard');

router.get('/cards', async (req, res) => {
    try{
        const cards = await getCards();
        res.send(cards);
    }
    catch(err){
        handleError(res, err);
    }
})

router.get('/cards/:id',async (req, res) => {
    try{
        const card = await getCard(req.params.id); // -> dynamic!
        res.send(card);
    }
    catch(err){
        handleError(res, err)
    }
})

router.post('/cards', auth, async (req, res) => {
    try{
        // step 1: Joi validtion (B)
        const { error } = joiSchema.validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }

        // step 2: Normalize(C)
        const normalizedCard = normalizeCard(req.body);

        // step 3: Service creates and saves (A)
        let newCard = await createNewCard(normalizedCard);
        res.send(newCard);
    }
    catch(err){
        handleError(res, err);
    }
})

router.put('/cards/:id', auth, async (req, res) => {
    try{
        let updatedCard = await updateCard(req.params.id, req.body);
        res.send(updatedCard);
    }
    catch(err){
        handleError(res, err);
    }
})

router.delete('/cards/:id', auth, async (req, res) => {
    try{
        let deletedCard = await deleteCard(req.params.id);
        res.send(deletedCard);
    }
    catch(err){
        handleError(res, err);
    }
})

router.patch('/cards/:id', auth, async (req, res) => {
    try{
        let card = await likeCard(req.params.id, req.body.userId)
        res.send(card)
    }
    catch(err){
        handleError(res, err);
    }
})

module.exports = router;