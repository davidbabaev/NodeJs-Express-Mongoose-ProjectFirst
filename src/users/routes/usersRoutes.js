// CRUD operations - express, routes

// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// wrong approach, we don't need to import to here router
// const router = require('../../router/router');

const {
    createNewUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser
} = require('../service/usersSvc')


router.get('/users', async (req, res) => {
    try{
        const users = await getUsers();
        res.send(users);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.get('/users/:id', async (req, res) => {
    try{
        const user = await getUser(req.params.id);
        res.send(user);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.post('/users', async (req, res) => {
    try{
        const newUser = await createNewUser(req.body);
        // newUser.save(); <- unnecessary
        res.send(newUser);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.put('/users/:id', async (req, res) => {
    try{
        let updatedUser = await updateUser(req.params.id, req.body)
        // updatedUser = updatedUser.save(); <-- unnecessary!
        // findByIdAndUpdate() already finds and saves in one operation.
        // the data is already presisted to mongoDB when it returns.
        res.send(updatedUser);
    }   
    catch(err){
        res.status(400).send(err.message)
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const deletedUser = await deleteUser(req.params.id);
        res.send(deletedUser);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = router;
