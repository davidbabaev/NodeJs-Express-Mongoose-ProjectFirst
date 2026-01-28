const express = require('express');

const app = express();
app.use(express.json());

const router = require('./router/router');
const connectToDB = require('./dbService');
app.use(router) // connect router to app

const PORT = 8181;

app.listen(PORT, () => {
    console.log('listening');
    connectToDB();
})