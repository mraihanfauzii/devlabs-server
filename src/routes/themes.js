const express = require('express');

const ThemesController = require('../controllers/themes/ThemesController');
const ThemesRepository = require('../repositories/themes/ThemesRepository');

const router = express.Router();
const themesRepository = new ThemesRepository();
const themesController = new ThemesController(themesRepository);

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => themesController.getAllThemes(req, res));
router.get('/:id', authMiddleware, (req, res) => themesController.getThemeById(req, res));

module.exports = router;
