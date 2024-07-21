const express = require('express');
const multer = require('multer');
const path = require('path');

const PortofoliosController = require('../controllers/portofolios/PortofoliosController');
const PortofoliosRepository = require('../repositories/portofolios/PortofoliosRepository');
const PortofolioAttachmentsRepository = require('../repositories/portofolios/PortofolioAttachmentsRepository');
const PortofolioClicksRepository = require('../repositories/portofolios/PortofolioClicksRepository');
const UsersRepository = require('../repositories/users/UsersRepository');
const StorageRepository = require('../repositories/storage/StorageRepository');
const ThemesRepository = require('../repositories/themes/ThemesRepository');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const portofoliosRepository = new PortofoliosRepository();
const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
const portofolioClicksRepository = new PortofolioClicksRepository();
const usersRepository = new UsersRepository();
const storageRepository = new StorageRepository();
const themesRepository = new ThemesRepository();
const portofoliosController = new PortofoliosController(
  portofoliosRepository,
  portofolioAttachmentsRepository,
  portofolioClicksRepository,
  usersRepository,
  storageRepository,
  themesRepository,
);

router.post('/', authMiddleware, roleMiddleware(['architect', 'admin']), upload.any(),
  (req, res) => portofoliosController.createPortofolio(req, res));
router.delete('/:id', authMiddleware, roleMiddleware(['architect', 'admin']),
  (req, res) => portofoliosController.deletePortofolioById(req, res));
router.put('/:id', authMiddleware, roleMiddleware(['architect', 'admin']), upload.any(),
  (req, res) => portofoliosController.updatePortofolioById(req, res));

router.get('/', authMiddleware, (req, res) => portofoliosController.getUserPortofolios(req, res));
router.get('/:id', authMiddleware, (req, res) => portofoliosController.getPortofolioById(req, res));


router.use('/attachments', express.static(path.join(__dirname, '../../public/portofolio_attachments')));

module.exports = router;
