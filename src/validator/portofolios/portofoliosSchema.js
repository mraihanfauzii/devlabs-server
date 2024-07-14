const Joi = require('joi');

const createPortofolioSchema = Joi.object({
  architect_id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  attachment_files: Joi.array().optional(),
});

const getPortofolioByIdSchema = Joi.object({
  id: Joi.string().required(),
});

const getUserPortofoliosSchema = Joi.object({
  architect_id: Joi.string().required(),
});

const deletePortofolioByIdSchema = Joi.object({
  id: Joi.string().required(),
  architect_id: Joi.string().required(),
});

module.exports = {
  createPortofolioSchema,
  getPortofolioByIdSchema,
  getUserPortofoliosSchema,
  deletePortofolioByIdSchema,
};
