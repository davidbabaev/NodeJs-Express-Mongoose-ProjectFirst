const { createError } = require('../../utils/handleErrors');
const Card = require('../models/Card')

const createNewCard = async (card) => {
    try{
        let newCard = new Card(card)
        newCard = await newCard.save();
        return newCard;
    }
    catch(err){
        throw err;
    }
}

const getCards = async () => {
        const cards = await Card.find()
        return cards;
}

const getCard = async (cardId) => {
        const card = await Card.findById(cardId)
        if(!card) throw createError(404, "Card not found")
        return card;
}

const updateCard = async (cardId, upCard) => {
        let updatedCard = await Card.findByIdAndUpdate(cardId, upCard, {new: true});
        if(!updatedCard) throw createError(404, "Cannot update card ");
        return updatedCard;
}

const deleteCard = async (cardId) => {
        const deletedCard = await Card.findByIdAndDelete(cardId);
        if(!deletedCard) throw createError(404, "Cannot delete card")
        return deletedCard;
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
        return savedCard;
}


module.exports = {
    createNewCard, 
    getCards, 
    getCard, 
    updateCard, 
    deleteCard, 
    likeCard
}