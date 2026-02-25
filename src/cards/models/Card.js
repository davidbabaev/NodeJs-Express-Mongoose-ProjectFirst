const mongoose = require('mongoose');
const {URL, DEFAULT_VALIDATOR} = require('../helpers/validators')

const CardSchema = new mongoose.Schema({
    title: String,
    content: String,
    web: URL,
    image: URL,
    location: {
        type: String,
        trim: true,
        maxLength: 256
    },
    category: String,
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