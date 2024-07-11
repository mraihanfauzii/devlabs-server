const transactionsSchema = require('../../validator/transactions/transactionsSchema');
const validator = require('../../validator');

class TransactionsController {
  constructor(transactionsRepository, projectsRepository) {
    this.transactionsRepository = transactionsRepository;
    this.projectsRepository = projectsRepository;
  }

  async addTransaction(req, res) {
    const payload = { ...req.body };
    const validatedPayload = validator.validatePayload(transactionsSchema.addTransaction, payload);
    if (validatedPayload.err) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.err,
        code: 400,
      });
    }

    const isProjectExist = await this.projectsRepository.getProjectById({ id: validatedPayload.data.project_id });
    if (isProjectExist.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'Project not found',
        code: 404,
      });
    }

    const result = await this.transactionsRepository.addTransaction(validatedPayload.data);

    if (result.error) {
      return res.status(500).send({
        success: false,
        message: 'Failed to create transaction',
        code: 500,
      });
    }

    return res.status(201).send({
      success: true,
      message: 'Transaction succesfully created',
      code: 201,
      data: result.rows[0],
    });
  }

  async getTransactionById(req, res) {
    const payload = { ...req.params };
    const validatedPayload = validator.validatePayload(transactionsSchema.getTransactionById, payload);
    if (validatedPayload.err) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.err,
        code: 400,
      });
    }

    const transaction = await this.transactionsRepository.getTransactionById(validatedPayload.data);

    if (transaction.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'Transaction not found',
        code: 404,
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Transaction found',
      code: 200,
      data: transaction.rows[0],
    });
  }
}

module.exports = TransactionsController;
