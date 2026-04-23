const express = require('express');
const router = express.Router();

const cardsRouter = require('../cards/routes/cardsRoutes');
const usersRouter = require('../users/routes/usersRoutes');
const notificationsRouter = require('../notifications/routes/notificationsRoutes');
const googleRoutes = require('../auth/googleRoutes');
const chatRoutes = require('../chat/routes/chatRoutes');

router.use(cardsRouter);
router.use(usersRouter);
router.use(notificationsRouter);
router.use(googleRoutes);
router.use(chatRoutes);

module.exports = router;