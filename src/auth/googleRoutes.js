const express = require('express');
const router = express.Router();
const passport = require('passport');
const {handleError} = require('../../utils/handleErrors');
const { signNewToken } = require('./providers/jwt');



// GET / auth/google
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))


// GET /auth/google/callback
router.get('/auth/google/callback', passport.authenticate('google'), async (req, res) => {
    try{
        const token = signNewToken(req.user)
        res.send(token)
    }   
    catch(err){
        handleError(res, err);
    } 
})

module.exports = router;