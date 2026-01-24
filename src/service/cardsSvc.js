const Card = require('../models/Card');

const createNewCard = async (card) => {
    try{
        let newCard = new Card(card);
        newCard = await newCard.save();
        return newCard;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const getCards = async () => {
    try{
        let cards = await Card.find();
        return cards;
    }
    catch(err){
        throw new Error(err.message)
    }
}

module.exports = {createNewCard, getCards};