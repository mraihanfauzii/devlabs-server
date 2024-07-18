const transactionsSchema = require('../../validator/transactions/transactionsSchema');
const validator = require('../../validator');

class TransactionsController {
  constructor(transactionsRepository, projectsRepository) {
    this.transactionsRepository = transactionsRepository;
    this.projectsRepository = projectsRepository;
  }

  async payBillTransactions(req, res) {
    const payload = { ...req.body };
    const {id} = req.params
    const result = await this.transactionsRepository.payBillTransactions(id, payload);

    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to pay the bill',
        code: 500,
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Transaction pay',
      code: 200,
      data: result.data,
    });
  }

  async addTransaction(req, res) {
    const payload = { ...req.body};
    const { id } = req.params
    const validatedPayload = validator.validatePayload(transactionsSchema.addTransaction, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }
    
    const isProjectExist = await this.projectsRepository.getProjectsById({ id: id });

    if (isProjectExist.error) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        code: 404,
      });
    }
    
    const result = await this.transactionsRepository.addTransaction(id, validatedPayload.data);

    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create transaction',
        code: 500,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Transaction succesfully created',
      code: 201,
      data: result.data[0],
    });
  }

  async getTransactionById(req, res) {
    const payload = { ...req.params };
    const validatedPayload = validator.validatePayload(transactionsSchema.getTransactionById, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const transaction = await this.transactionsRepository.getTransactionById(validatedPayload.data);

    if (transaction.error) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
        code: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Transaction found',
      code: 200,
      data: transaction.data[0],
    });
  }
}

module.exports = TransactionsController;
