const Joi = require('joi');

const createPortofolioSchema = Joi.object({
  architect_id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  theme_id: Joi.string().required(),
  estimated_budget: Joi.number().integer().optional(),
  attachment_files: Joi.array().optional(),
});

const getPortofolioByIdSchema = Joi.object({
  id: Joi.string().required(),
  user_id: Joi.string().required(),
});

const getUserPortofoliosSchema = Joi.object({
  architect_id: Joi.string().required(),
});

const deletePortofolioByIdSchema = Joi.object({
  id: Joi.string().required(),
  architect_id: Joi.string().required(),
});

const updatePortofolio = Joi.object({
  id: Joi.string().required(),
  architect_id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  theme_id: Joi.string().required(),
  estimated_budget: Joi.number().integer().optional(),
  attachment_files: Joi.array().optional(),
});

const getPortofolioFavourites = Joi.object({
  user_id: Joi.string().required(),
});

const favouritePortofolio = Joi.object({
  portofolio_id: Joi.string().required(),
  user_id: Joi.string().required(),
});

const getAllPortofolios = Joi.object({
  theme_id: Joi.string().optional(),
});

module.exports = {
  createPortofolioSchema,
  getPortofolioByIdSchema,
  getUserPortofoliosSchema,
  deletePortofolioByIdSchema,
  updatePortofolio,
  getPortofolioFavourites,
  favouritePortofolio,
  getAllPortofolios,
};
