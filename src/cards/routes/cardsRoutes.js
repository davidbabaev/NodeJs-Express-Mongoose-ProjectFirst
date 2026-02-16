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
    pickSafeCardFields,
} = require('../service/cardsSvc');
const auth = require('../../auth/authService');

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
        res.send(pickSafeCardFields(card));
    }
    catch(err){
        handleError(res, err)
    }
})

router.post('/cards', auth, async (req, res) => {
    try{
        const { error } = joiSchema.validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }

        let newCard = await createNewCard(req.body, req.user.userId);
        res.send(newCard);
    }
    catch(err){
        handleError(res, err);
    }
})

router.put('/cards/:id', auth, async (req, res) => {
    try{
        const card = await getCard(req.params.id)
        if(req.user.userId === card.userId.toString() || req.user.isAdmin){
            let updatedCard = await updateCard(req.params.id, req.body);
            res.send(pickSafeCardFields(updatedCard));
        }
        else{
            res.status(403).send('You not allowed to edit this card')
        }
    }
    catch(err){
        handleError(res, err);
    }
})

router.delete('/cards/:id', auth, async (req, res) => {
    try{
        const card = await getCard(req.params.id)
        if(req.user.userId === card.userId.toString() || req.user.isAdmin){
            let deletedCard = await deleteCard(req.params.id);
            res.send(pickSafeCardFields(deletedCard));
        }
        else{
            res.status(403).send('Your not allowed to delete this card')
        }
    }
    catch(err){
        handleError(res, err);
    }
})

router.patch('/cards/:id', auth, async (req, res) => {
    try{
        let cardLike = await likeCard(req.params.id, req.user.userId)
        res.send(cardLike)
    }
    catch(err){
        handleError(res, err);
    }
})

module.exports = router;