const mongoose = require('mongoose');
const { 
    URL, 
    EMAIL, 
    DEFAULT_VALIDATOR, 
    PHONE, 
    NUMBER, 
    PASSWORD,
    getMaxBirthDate
} = require('../helpers/userValidators') 

const UserSchema = new mongoose.Schema({
    name: DEFAULT_VALIDATOR,
    lastName: DEFAULT_VALIDATOR,
    email: EMAIL,
    password: PASSWORD,
    phone: PHONE,
    profilePicture: URL,
    coverImage: URL,
    age: {
        type: Number,
        min: 5,
        max: 120,
        required: true
    },
    job: {
        type: String,
        minLength: 2,
        maxLength: 50,
    },
    gender: {
        type: String,
        minLength: 4,
        maxLength: 10,
    },
    birthDate: {
        type: Date,
        required: true
    },
    aboutMe: {
        type: String,
        maxLength: 1024,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    address: {
        country:{
            type: String,
            minLength: 2,
            maxLength: 1024,
        },
        city: {
            type: String,
            minLength: 2,
            maxLength: 1024,
        },
        street: {
            type: String,
            minLength: 2,
            maxLength: 1024,
        },
        house: {
            type: Number,
            min: 1,
        },
        zip: {
            type: Number,
            min: 1,
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
})

const User = mongoose.model('User', UserSchema);
module.exports = User;