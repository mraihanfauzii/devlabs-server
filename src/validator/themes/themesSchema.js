const Joi = require('joi');

const getThemeById = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  getThemeById,
};
