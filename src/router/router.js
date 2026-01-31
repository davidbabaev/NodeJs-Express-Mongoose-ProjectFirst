const express = require('express');
const router = express.Router();

const cardsRouter = require('../cards/routes/cardsRoutes');
const usersRouter = require('../users/routes/usersRoutes')

router.use(cardsRouter);
router.use(usersRouter);

module.exports = router;