const express = require('express');
const corsPolicyMiddleware = require('../src/middlewares/cors')
const app = express();

app.use(corsPolicyMiddleware)
app.use(express.json());

const router = require('./router/router');
const connectToDB = require('./dbService');

// if i want to create a missleware function:
// i want all the function will print something in the log 
// app.use() can get a middleware
// if we don't add a route '/smth', it means the missleware will be
// implemented on all the routes.
// we can do things with the res and the req.
app.use((req, res, next) => {
    console.log('new request has been recieved');
    console.log(`Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`);
    // res.send()
    // correct middleware need to res or push it forward
    // every middleware can get req, res and next, next is for the next missware
    // this it thell to the app.js. move to the next missleware in the layers.
    next();
    // without next or response the server will break. 
    // we need to respose or next()
})

app.use(router); // connect router to app

const PORT = 8181;

app.listen(PORT, () => {
    console.log('listening');
    connectToDB();
})