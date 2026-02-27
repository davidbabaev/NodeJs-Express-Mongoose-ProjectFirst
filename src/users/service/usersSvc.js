const User = require('../models/User');
const _ = require('lodash');
const {generateUserPassword, comparePassword} = require('../helpers/bcrypt');
const {signNewToken} = require('../../auth/providers/jwt');
const { createError } = require('../../utils/handleErrors');
const normalizeUser = require('../helpers/normalizeUser');
 
const pickSafeUserFields = (user) => {
    return _.pick(user.toObject() , [
        "name", 
        "lastName", 
        "email", 
        "phone", 
        "profilePicture", 
        "coverImage",
        "address",
        "age",
        "job",
        "gender",
        "birthDate",
        "aboutMe",
        "createdAt",
        "_id",
        "following",
    ]);
}

// MongoDB operation

const createNewUser = async (user) => {
    try{
        user.password = await generateUserPassword(user.password)
        const normalizedUser = normalizeUser(user)
        let newUser = new User(normalizedUser);
        newUser = await newUser.save();

        const token = signNewToken(newUser);
        const safeUser = pickSafeUserFields(newUser);
        return{token, safeUser}
    }
    catch(err){
        throw err;
    }
}

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
        const safeUser = pickSafeUserFields(user);
        return{token, safeUser}
    }
    catch(err){
        throw err;
    }
}

const getUsers = async () => {
        const users = await User.find();
        // return pickSafeUserFields(users)
        return users.map(user => pickSafeUserFields(user))
}

const getUser = async (userId) => {
        const user = await User.findById(userId);
        if(!user) throw createError(404, "User not found")
        return pickSafeUserFields(user) 
}

const updateUser = async (userId, content) => {
    const normalizeContent = normalizeUser(content);
    const updatedUser = await User.findByIdAndUpdate(userId, normalizeContent, {new: true});
    if(!updatedUser) throw createError(404, "Update not not possible")
    return pickSafeUserFields(updatedUser)
}

const followUser = async (userId, followingUserId) => {
    // cannot follow yourself
    if(userId === followingUserId) throw createError(400, "Cannot Follow Yourself")

    const user = await User.findById(userId);
    if(!user) throw createError(404, 'User didnt found')

    // if user.following have and id if not put this id in this array
    if(user.following.includes(followingUserId)){
        user.following = user.following.filter(id => id !== followingUserId);
    }
    else{
        user.following.push(followingUserId)
    }

    const saveFollow = await user.save()
    return pickSafeUserFields(saveFollow);
}   

const deleteUser = async (userId) => {
        const deleted = await User.findByIdAndDelete(userId); 
        if(!deleted) throw createError(404, "Delete user not possible")
        return pickSafeUserFields(deleted)
} 

module.exports = {createNewUser, getUsers, getUser, updateUser, deleteUser, loginUser, pickSafeUserFields, followUser};