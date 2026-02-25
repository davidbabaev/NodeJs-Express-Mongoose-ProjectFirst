// CRUD operations - requests:

const express = require('express');
const router = express.Router();
const {handleError} = require('../../utils/handleErrors')

const {
    createNewUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser,
    loginUser,
} = require('../service/usersSvc');
const validateUser = require('../validation/joi/validateUserWithJoi');
const auth = require('../../auth/authService');


router.get('/users', async (req, res) => {
    try{
        const users = await getUsers();
        res.send(users);
    }
    catch(err){
        handleError(res, err);
    }
})

router.get('/users/:id', async (req, res) => {
    try{
        const user = await getUser(req.params.id);
        res.send(user);
    }
    catch(err){
        handleError(res, err);
    }
})

router.post('/users', async (req, res) => {
    try{
        const {error} = validateUser(req.body)
        if(error) return res.status(400).send(error.details[0].message);
        const newUser = await createNewUser(req.body);
        res.send(newUser);
    }
    catch(err){
        handleError(res, err);
    }
})

router.post('/users/login', async (req,res) => {
    try{
        const token = await loginUser(req.body);
        res.send(token);
    }
    catch(err){
        handleError(res, err);
    }
})

router.put('/users/:id', auth ,async (req, res) => {
    try{
        if(req.user.userId === req.params.id || req.user.isAdmin){
            let updatedUser = await updateUser(req.params.id, req.body)
            console.log("Updated User: ", updatedUser);
            
            res.send(updatedUser);
        }
        else{
            res.status(403).send('You not allowed to edit this')
        }
    }   
    catch(err){
        handleError(res, err);
    }
})

router.delete('/users/:id', auth , async (req, res) => {
    try{
        if(req.user.userId === req.params.id || req.user.isAdmin){
            const deletedUser = await deleteUser(req.params.id);
            res.send(deletedUser);
        }
        else{
            res.status(403).send('You not allowed to do that')
        }
    }
    catch(err){
       handleError(res, err);
    }
})

module.exports = router;
