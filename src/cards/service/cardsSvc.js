const Card = require('../models/Card')

const createNewCard = async (card) => {
    try{
        let newCard = new Card(card)
        newCard = await newCard.save();
        return newCard;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const getCards = async () => {
    try{
        const cards = await Card.find()
        return cards;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const getCard = async (cardId) => {
    try{
        const card = await Card.findById(cardId)
        return card;
    }
    catch(err){
        throw new Error(err.message)
    }
}

module.exports = {createNewCard, getCards, getCard}