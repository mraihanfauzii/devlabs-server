const Joi = require('joi');

const addProject = Joi.object({
  client_id: Joi.string().required(),
  vendor_id: Joi.string().required(),
  name: Joi.string().required(),
  notes: Joi.string().required(),
});

const getProjectsByUserId = Joi.object({
  user_id: Joi.string().required(),
});

const deleteProjectById = Joi.object({
  id: Joi.string().required(),
  user_id: Joi.string().required(),
});

const getRecommendedArchitects = Joi.object({
  area: Joi.number().integer().required(),
  city: Joi.string().required(),
  theme: Joi.string().required(),
  budget: Joi.string().required(),
});

module.exports = {
  addProject,
  getProjectsByUserId,
  deleteProjectById,
  getRecommendedArchitects,
};
