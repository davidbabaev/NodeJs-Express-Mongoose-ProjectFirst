const express = require('express');
const router = express.Router();

const cardsRouter = require('../cards/routes/cardsRoutes');

router.use(cardsRouter);

module.exports = router;