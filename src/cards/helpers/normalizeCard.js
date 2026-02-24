const normalizeCard = (card) => {
    return{
        ...card, // keep everything the user sent
        image: card.image?.url || "https://via.placeholder.com/300",
        likes: card.likes || [],
        category: card.category || "general"
    }
}

module.exports = normalizeCard;