const mongoose = require('mongoose');
const {URL, DEFAULT_VALIDATOR} = require('../helpers/validators')

const CardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATOR,
    content: DEFAULT_VALIDATOR,
    web: URL,
    image: {
        url: URL,
        alt: String,
    },
    location: {
        type: String,
        trim: true,
        maxLength: 256
    },
    category: DEFAULT_VALIDATOR,
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

const Card = mongoose.model('Card', CardSchema)
module.exports = Card;