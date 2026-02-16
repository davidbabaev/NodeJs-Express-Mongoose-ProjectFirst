const { createError } = require('../../utils/handleErrors');
const normalizeCard = require('../helpers/normalizeCard');
const Card = require('../models/Card')
const _ = require('lodash');

const pickSafeCardFields = (card) => {
    return _.pick(card.toObject() ,[
        "title",
        "content",
        "web",
        "image",
        "location",
        "category",
        "likes",
        "createdAt",
    ])
}

const createNewCard = async (card, userId) => {
    try{
        card = normalizeCard(card) // fill defaults
        let newCard = new Card({...card, userId})
        newCard = await newCard.save();
        // return newCard;
        return pickSafeCardFields(newCard)
    }
    catch(err){
        throw err;
    }
}

const getCards = async () => {
        const cards = await Card.find()
        return cards.map(card => pickSafeCardFields(card))
}

const getCard = async (cardId) => {
        const card = await Card.findById(cardId)
        if(!card) throw createError(404, "Card not found")
        return pickSafeCardFields(card)
}

const updateCard = async (cardId, upCard) => {
        let updatedCard = await Card.findByIdAndUpdate(cardId, upCard, {new: true});
        if(!updatedCard) throw createError(404, "Cannot update card ");
        return pickSafeCardFields(updatedCard)

}

const deleteCard = async (cardId) => {
        const deletedCard = await Card.findByIdAndDelete(cardId);
        if(!deletedCard) throw createError(404, "Cannot delete card")
        return pickSafeCardFields(deletedCard)
}

const likeCard = async (cardById, userId) => {
        // 1. find the card by id
        const card = await Card.findById(cardById);
        if(!card) throw createError(404, "Card not found")
        
        // 2. check and change likes
        if(card.likes.includes(userId)){
            card.likes = card.likes.filter(id => id !== userId)
        }
        else{
            card.likes.push(userId);
        }
        // 3. save after changes
        const savedCard = await card.save();

        // 4. return
        return pickSafeCardFields(savedCard);
}


module.exports = {
    createNewCard, 
    getCards, 
    getCard, 
    updateCard, 
    deleteCard, 
    likeCard
}