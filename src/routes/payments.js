const express = require('express');
const PaymentsController = require('../controllers/payments/PaymentsController');
const PaymentsRepository = require('../repositories/payments/PaymentsRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const paymentsRepository = new PaymentsRepository();
const paymentsController = new PaymentsController(paymentsRepository);

router.get('/', authMiddleware, (req, res) => paymentsController.getAllPaymentMethod(req, res));
router.get('/:id', authMiddleware, (req, res) => paymentsController.getAllPaymentMethodByID(req, res));

module.exports = router;
