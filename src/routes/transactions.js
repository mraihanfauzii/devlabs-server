const express = require('express');
const TransactionsController = require('../controllers/transactions/TransactionsController');
const TransactionsRepository = require('../repositories/transactions/TransactionsRepository');
const ProjectsRepository = require('../repositories/projects/ProjectsRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const transactionsRepository = new TransactionsRepository();
const projectsRepository = new ProjectsRepository();
const transactionsController = new TransactionsController(transactionsRepository, projectsRepository);

router.post('/:id/create', authMiddleware, (req, res) => transactionsController.addTransaction(req, res));
router.put('/:id/pay', authMiddleware, (req, res) => transactionsController.payBillTransactions(req, res));
router.get('/:id', authMiddleware, (req, res) => transactionsController.getTransactionById(req, res));

module.exports = router;
