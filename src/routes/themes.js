const express = require('express');

const ThemesController = require('../controllers/themes/ThemesController');
const ThemesRepository = require('../repositories/themes/ThemesRepository');
const ThemeClicksRepository = require('../repositories/themes/ThemeClicksRepository');

const router = express.Router();
const themesRepository = new ThemesRepository();
const themeClicksRepository = new ThemeClicksRepository();
const themesController = new ThemesController(themesRepository, themeClicksRepository);

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => themesController.getAllThemes(req, res));
router.get('/trending', authMiddleware, (req, res) => themesController.getTrendingThemes(req, res));
router.get('/:id', authMiddleware, (req, res) => themesController.getThemeById(req, res));

module.exports = router;
