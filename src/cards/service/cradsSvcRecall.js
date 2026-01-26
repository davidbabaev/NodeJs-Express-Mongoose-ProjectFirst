// const Card = require('../models/Card');

// const createNewCard = async (card) => {

//     // what we need?
//     // save card that the user request, to the database
//     // the card is new each time
//     // i'm not sure again about the order of the syntax.

//     try{
//         // let card = await new card.save(Card)
//         // what this line do:
//         // let card, we do await on new card variable.save this variable with Card schema as a parameter.

//         // what we need to do:
//         // this code is wrong, but i don't remember how the right code looks like, and the order of the code here.
//         // this is mess, i'm trying to connects words that i remember in my head and try to remember that code was look like
//         // and coonect both of these and this is the result, this is not real understanding of the syntax and the order of the things,
//         // it's just random words that iu try to connect, maybe because i don't understand the deep logic and order of the code
//         // i still can't write it from my memory.

//         // i know we need to do return newCard for take it out from the function, so we can use it, but the 2 other lines is wrong.
//         let newCard = new Card(card)
//         newCard = await newCard.save()
//         return newCard;
//     }
//     catch(err){
//         throw new Error(err.message)
//     }
// } 

// const getCards = async () => {
//     try{
//         const cards = await Card.find()
//         return cards
//     }
//     catch(err){
//         throw new Error(err.message)
//     }
// }

// const getCard = async (userId) => {
//     try{
//         const card = await Card.findById(userId)
//         return card;
//     }
//     catch(err){
//         throw new Error(err.message)
//     }
// } 

// module.exports = {createNewCard, getCards, getCard}