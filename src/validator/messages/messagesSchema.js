const Joi = require('joi');

const createMessage = Joi.object({
  sender_id: Joi.string().required(),
  receiver_id: Joi.string().required(),
  message: Joi.string().required(),
});

const getMessagesBetweenUsers = Joi.object({
  first_user_id: Joi.string().required(),
  second_user_id: Joi.string().required(),
});

const getLastMessagesForUser = Joi.object({
  user_id: Joi.string().required(),
});

module.exports = {
  createMessage,
  getMessagesBetweenUsers,
  getLastMessagesForUser,
};
