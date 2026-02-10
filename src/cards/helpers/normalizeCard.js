const normalizeCard = (card) => {
    return{
        ...card, // keep everything the user sent
        image:{
            url: card.image?.url || "https://via.placeholder.com/300",
            alt: card.image?.alt || "card image",
        },
        likes: card.likes || [],
        category: card.category || "general"
    }
}

module.exports = normalizeCard;