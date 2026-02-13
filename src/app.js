require('dotenv').config();

const express = require('express');
const corsPolicyMiddleware = require('../src/middlewares/cors')
const app = express();

app.use(corsPolicyMiddleware)
app.use(express.json());

const router = require('./router/router');
const connectToDB = require('./dbService');
const chalk = require('chalk');

app.use((req, res, next) => {
    console.log('new request has been recieved');
    console.log(`Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`);
    next();
})

console.log(process.env);


app.use(router); // connect router to app

// const PORT = 8181; <- replaced:
const PORT = process.env.PORT;

// this line handle errors global on our all files. prevent server collapse
app.use((err, req, res, next ) => {
    console.log('ERROR: ', err.message);
    res.status(500).send('Internal error of the server')
})

app.listen(PORT, () => {
    console.log(chalk.yellow('App is listening to port', PORT));
    connectToDB();
})