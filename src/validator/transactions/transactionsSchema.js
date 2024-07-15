const Joi = require('joi');

const addTransaction = Joi.object({
  price: Joi.number().positive().required(),
});

const getTransactionById = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  addTransaction,
  getTransactionById,
};
