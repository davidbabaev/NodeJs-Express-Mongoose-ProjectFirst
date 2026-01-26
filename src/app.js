const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const router = require('./router/router');
app.use(router) // connect router to app

const PORT = 8181;

const connectToDB = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/newCardsData')
        console.log('connected to mongoDB');
    }
    catch(err){
        console.log(err.message);
    }
}

app.listen(PORT, () => {
    console.log('listening');
    connectToDB();
})