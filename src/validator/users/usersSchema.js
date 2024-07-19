const Joi = require('joi');

const registerUser = Joi.object({
  profile_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phonenumber: Joi.string().required(),
  role: Joi.string().required().valid('admin', 'client', 'architect', 'builder'),
});

const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required().valid('admin', 'client', 'architect', 'builder'),
});

const updateUserProfile = Joi.object({
  id: Joi.string().required(),
  profile_name: Joi.string().required(),
  profile_picture: Joi.array().max(1),
  profile_description: Joi.string().required(),
  phonenumber: Joi.string().required(),
});

const logout = Joi.object({
  id: Joi.string().required(),
});

const refreshToken = Joi.object({
  token: Joi.string().required(),
});

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  logout,
  refreshToken,
};
