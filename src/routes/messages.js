const express = require('express');
const MessagesController = require('../controllers/messages/MessagesController');
const MessagesRepository = require('../repositories/messages/MessagesRepository');
const UsersRepository = require('../repositories/users/UsersRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const messagesRepository = new MessagesRepository();
const usersRepository = new UsersRepository();
const messagesController = new MessagesController(messagesRepository, usersRepository);

router.post('/', authMiddleware, (req, res) => messagesController.createMessage(req, res));
router.get('/', authMiddleware, (req, res) => messagesController.getMessagesBetweenUsers(req, res));

module.exports = router;
