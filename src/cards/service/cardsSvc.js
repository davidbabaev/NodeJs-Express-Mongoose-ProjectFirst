const User = require('../../users/models/User');
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
        "comments",
        "createdAt",
        "_id",
        "userId",
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
    return pickSafeCardFields(savedCard);
}

const addComment = async (cardId, userId, commentText) => {
    // find the card by ID
    const card = await Card.findById(cardId);
    if(!card) throw createError(404, "Card not found")

    card.comments.push({userId, commentText})
    // save after changes
    const saveComment = await card.save();
    // return picked
    return pickSafeCardFields(saveComment)
}

const removeComment = async (cardId, commentId) => {
    const card = await Card.findById(cardId);
    if(!card) throw createError(404, "Card not found")

    card.comments = card.comments.filter(comment => comment._id.toString() !== commentId)

    const saveComment = await card.save();
    return pickSafeCardFields(saveComment)
}

const getFeedCards = async (userId) => {
    const user = await User.findById(userId)
    if(!user) throw createError(404, "User not found")

    // find cards where userId is in this array
    const feedCards = await Card.find({userId: {$in: user.following}}).sort({createdAt: -1})

    return feedCards.map(card => pickSafeCardFields(card))   
}


module.exports = {
    createNewCard, 
    getCards, 
    getCard, 
    updateCard, 
    deleteCard, 
    likeCard,
    pickSafeCardFields,
    addComment,
    removeComment,
    getFeedCards,
}