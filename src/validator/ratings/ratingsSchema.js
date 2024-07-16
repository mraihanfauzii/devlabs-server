const Joi = require('joi');

const createRating = Joi.object({
  rater_id: Joi.string().required(),
  ratee_id: Joi.string().required(),
  rating: Joi
    .number()
    .integer()
    .min(1)
    .max(5)
    .required(),
  description: Joi.string().required(),
  attachment_files: Joi.array().optional(),
});

const getRatingsByRateeId = Joi.object({
  ratee_id: Joi.string().required(),
});

const getRatingsByRaterId = Joi.object({
  rater_id: Joi.string().required(),
});

const getRatingById = Joi.object({
  id: Joi.string().required(),
});

const getRateeAverageRating = Joi.object({
  ratee_id: Joi.string().required(),
});

module.exports = {
  createRating,
  getRatingsByRateeId,
  getRatingsByRaterId,
  getRatingById,
  getRateeAverageRating,
};
