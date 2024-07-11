const Joi = require('joi');

const addTransaction = Joi.object({
  project_id: Joi.string().required(),
});

const getTransactionById = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  addTransaction,
  getTransactionById,
};
