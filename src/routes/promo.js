const express = require('express');
const PromoController = require('../controllers/promo/promoController');
const PromoRepository = require('../repositories/promo/promoRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const promoRepository = new PromoRepository();
const promoController = new PromoController(promoRepository);

router.get('/', authMiddleware, (req, res) => promoController.getPromo(req, res));

module.exports = router;
