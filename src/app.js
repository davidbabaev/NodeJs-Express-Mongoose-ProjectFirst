require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');


const corsPolicyMiddleware = require('./middlewares/cors');
const app = express();

require('./auth/googleStrategy');
app.use(passport.initialize());

app.use(corsPolicyMiddleware)
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));
const router = require('./router/router');
const {connectToDB} = require('./dbService');
const chalk = require('chalk');

app.use(router); // connect router to app

const PORT = process.env.PORT || 8181;

app.get('/{*splat}', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// this line handle errors global on our all files. prevent server collapse
app.use((err, req, res, next ) => {
    console.log('ERROR: ', err.message);
    res.status(500).send('Internal error of the server')
})

app.listen(PORT, () => {
    console.log(chalk.yellow('App is listening to port', PORT));
    connectToDB();
});