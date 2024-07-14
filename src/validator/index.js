const dataWrapper = require('../utils/dataWrapper');

const validatePayload = (schema, payload) => {
  const { value, error } = schema.validate(payload);
  if (error) {
    const mappedError = error.details.map((err) => err.message.replace(/"/g, ''));
    return dataWrapper.error(mappedError);
  }
  return dataWrapper.data(value);
};

module.exports = {
  validatePayload,
};
