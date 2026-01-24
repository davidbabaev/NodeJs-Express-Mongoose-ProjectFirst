const mongoose = require('mongoose');
const {NUMBER, URL, EMAIL, DEFAULT_VALIDATOR} = require('../helpers/validators')

const CardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATOR,
    subtitle: DEFAULT_VALIDATOR,
    description: DEFAULT_VALIDATOR,
    phone: DEFAULT_VALIDATOR,
    email: EMAIL,
    web: URL,
    image: {
        url: URL,
        alt: DEFAULT_VALIDATOR,
    },
    address: {
        country: DEFAULT_VALIDATOR,
        city: DEFAULT_VALIDATOR,
        street: DEFAULT_VALIDATOR,
        houseNumber: NUMBER,
        zip: NUMBER,
    },
    bizNumber: NUMBER,
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