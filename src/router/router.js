const express = require('express');
const router = express.Router();

const cardsRouter = require('../cards/routes/cardsRoutes');
const usersRouter = require('../users/routes/usersRoutes');
const googleRoutes = require('../auth/googleRoutes');

router.use(cardsRouter);
router.use(usersRouter);
router.use(googleRoutes);

module.exports = router;