const express = require('express');
const router = require('../src/router/router');
const passport = require('passport');
const { signNewToken } = require('../src/auth/providers/jwt');
const { handleError } = require('../src/utils/handleErrors');

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), async (req,res) => {
    try{
        const token = signNewToken(req.user)
        res.send(token)
    }
    catch(err){
        handleError(res, err)
    }
})
