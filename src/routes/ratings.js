const express = require('express');
const multer = require('multer');
const path = require('path');

const RatingsController = require('../controllers/ratings/RatingsController');
const RatingsRepository = require('../repositories/ratings/RatingsRepository');
const RatingAttachmentsRepository = require('../repositories/ratings/RatingAttachmentsRepository');
const UsersRepository = require('../repositories/users/UsersRepository');
const StorageRepository = require('../repositories/storage/StorageRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const ratingsRepository = new RatingsRepository();
const ratingAttachmentsRepository = new RatingAttachmentsRepository();
const usersRepository = new UsersRepository();
const storageRepository = new StorageRepository();
const ratingsController = new RatingsController(ratingsRepository, ratingAttachmentsRepository, usersRepository, storageRepository);

router.post('/', authMiddleware, upload.any(), (req, res) => ratingsController.createRating(req, res));
router.get('/:id', authMiddleware, (req, res) => ratingsController.getRatingById(req, res));
router.get('/ratee/:ratee_id', authMiddleware, (req, res) => ratingsController.getRatingsByRateeId(req, res));
router.get('/rater/:rater_id', authMiddleware, (req, res) => ratingsController.getRatingsByRaterId(req, res));
router.get('/ratee/:ratee_id/average', authMiddleware, (req, res) => ratingsController.getRateeAverageRating(req, res));

router.use('/attachments', express.static(path.join(__dirname, '../../public/rating_attachments')));

module.exports = router;
