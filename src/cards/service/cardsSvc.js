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

const updateCard = async (cardId, upCard) => {
    try{
        let updatedCard = await Card.findByIdAndUpdate(cardId, upCard, {new: true});
        return updatedCard;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const deleteCard = async (cardId) => {
    try{
        const deletedCard = await Card.findByIdAndDelete(cardId);
        return deletedCard;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const likeCard = async (cardById, userId) => {
    try{
        // 1. find the card by id
        const card = await Card.findById(cardById);
        
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
    catch(err){
        throw new Error(err.message)
    }
}

module.exports = {
    createNewCard, 
    getCards, 
    getCard, 
    updateCard, 
    deleteCard, 
    likeCard
}