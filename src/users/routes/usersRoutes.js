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
const normalizeUser = require('../helpers/normalizeUser');


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
        const normalizedUser = normalizeUser(req.body)
        const newUser = await createNewUser(normalizedUser);
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

router.put('/users/:id', async (req, res) => {
    try{
        let updatedUser = await updateUser(req.params.id, req.body)
        res.send(updatedUser);
    }   
    catch(err){
        handleError(res, err);
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const deletedUser = await deleteUser(req.params.id);
        res.send(deletedUser);
    }
    catch(err){
       handleError(res, err);
    }
})

module.exports = router;
