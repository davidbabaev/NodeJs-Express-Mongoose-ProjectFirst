const jwt = require('jsonwebtoken');

const SECRET_WORD = 'davidsecretword';

// called when user logs in - created a token
const generateAuthToken = (user) => {

    // use jwt.sign() here
    const token = jwt.sign(
        {_id: user._id, isAdmin: user.isAdmin}, // --> payload - wht we store
        SECRET_WORD // our secret stamp
    );

    return token;
};

const verifyToken = (tokenFromClient) => {
    // important: jwt.verify() throws an error if token is invalid, so we need try/ catch
    try{
        // if token is valid, jwt.verify returns the payload
        const payload = jwt.verify(tokenFromClient, SECRET_WORD);
        return payload; // token in good
    }
    catch(err){
        // if token is fake/ expired, jwt. verify throws error
        // we catch it and return null
        return null; // token is bad
    }
};

module.exports = {generateAuthToken, verifyToken};