const User = require('../models/User');
const _ = require('lodash');
const {generateUserPassword, comparePassword} = require('../helpers/bcrypt');
const {signNewToken} = require('../../auth/providers/jwt');
 
const pickSafeUserFields = (user) => {
    return _.pick(user, ["firstName", "lastName", "email", "phone", "profilePicture", "address" , "_id"]);
}

// MongoDB operation

const createNewUser = async (user) => {
    try{
        user.password = await generateUserPassword(user.password)

        let newUser = new User(user);
        newUser = await newUser.save();
        return pickSafeUserFields(newUser);
    }
    catch(err){
        throw new Error(err.message)
    }
}

// don't have loginUser function at all:
const loginUser = async ({email, password}) => {
    try{
        // find the user by email in mongoDB
        const user = await User.findOne({email});
        if(!user) throw new Error("Invalid email or password");

        // compare plain password with hashed password form DB
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) throw new Error("Invalid email or password");

        // password correct --> generate JWT token
        const token = signNewToken(user);
        return token;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const getUsers = async () => {
    try{
        const users = await User.find();
        return pickSafeUserFields(users)

    }
    catch(err){
        throw new Error(err.message)
    }
}

const getUser = async (userId) => {
    try{
        const user = await User.findById(userId);
        return pickSafeUserFields(user)
    }
    catch(err){
        throw new Error(err.message)
    }
}

const updateUser = async (userId, content) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(userId, content, {new: true});
        return pickSafeUserFields(updateUser)

    }
    catch(err){
        throw new Error(err.message);
    }
}

const deleteUser = async (userId) => {
    try{
        const deleted = await User.findByIdAndDelete(userId); 
        return pickSafeUserFields(updateUser)
    }
    catch(err){
        throw new Error(err.message)
    }
} 

module.exports = {createNewUser, getUsers, getUser, updateUser, deleteUser, loginUser};