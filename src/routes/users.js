const express = require('express');
const path = require('path');
const multer = require('multer');
const UsersController = require('../controllers/users/UsersController');
const UsersRepository = require('../repositories/users/UsersRepository');
const StorageRepository = require('../repositories/storage/StorageRepository');
const RedisRepository = require('../repositories/redis/RedisRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const router = express.Router();
const usersRepository = new UsersRepository();
const storageRepository = new StorageRepository();
const redisRepository = new RedisRepository();
const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

router.get('/list', authMiddleware, (req, res) => usersController.getAllUsers(req, res));
router.get('/', authMiddleware, (req, res) => usersController.getUserByToken(req, res));
router.post('/register', (req, res) => usersController.register(req, res));
router.post('/login', (req, res) => usersController.login(req, res));
router.put('/', authMiddleware, upload.any(), (req, res) => usersController.updateUserProfile(req, res));
router.delete('/logout', authMiddleware, (req, res) => usersController.logout(req, res));
router.put('/refresh-token', (req, res) => usersController.refreshToken(req, res));

router.use('/profile-pictures', express.static(path.join(__dirname, '../../public/profile_pictures')));

module.exports = router;
