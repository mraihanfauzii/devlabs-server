const express = require('express');
const multer = require('multer');
const path = require('path');

const PortofoliosController = require('../controllers/portofolios/PortofoliosController');
const PortofoliosRepository = require('../repositories/portofolios/PortofoliosRepository');
const PortofolioAttachmentsRepository = require('../repositories/portofolios/PortofolioAttachmentsRepository');
const UsersRepository = require('../repositories/users/UsersRepository');
const StorageRepository = require('../repositories/storage/StorageRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const portofoliosRepository = new PortofoliosRepository();
const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
const usersRepository = new UsersRepository();
const storageRepository = new StorageRepository();
const portofoliosController = new PortofoliosController(portofoliosRepository, portofolioAttachmentsRepository, usersRepository, storageRepository);

router.post('/', authMiddleware, upload.any(), (req, res) => portofoliosController.createPortofolio(req, res));
router.get('/', authMiddleware, (req, res) => portofoliosController.getUserPortofolios(req, res));
router.get('/:id', authMiddleware, (req, res) => portofoliosController.getPortofolioById(req, res));
router.delete('/:id', authMiddleware, (req, res) => portofoliosController.deletePortofolioById(req, res));
router.put('/:id', authMiddleware, upload.any(), (req, res) => portofoliosController.updatePortofolioById(req, res));

router.use('/attachments', express.static(path.join(__dirname, '../../public/portofolio_attachments')));

module.exports = router;
