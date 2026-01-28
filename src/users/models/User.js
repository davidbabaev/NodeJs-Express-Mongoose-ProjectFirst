const mongoose = require('mongoose');
const { 
    URL, 
    EMAIL, 
    DEFAULT_VALIDATOR, 
    PHONE, 
    NUMBER, 
    PASSWORD
} = require('../helpers/userValidators')

const UserSchema = new mongoose.Schema({
    firstName: DEFAULT_VALIDATOR,
    lastName: DEFAULT_VALIDATOR,
    email: EMAIL,
    password: PASSWORD,
    phone: PHONE,
    profilePicture: URL,
    address: {
        country: DEFAULT_VALIDATOR,
        city: DEFAULT_VALIDATOR,
        street: DEFAULT_VALIDATOR,
        house: NUMBER,
        zip: NUMBER
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;