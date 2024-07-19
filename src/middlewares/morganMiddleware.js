// src/middlewares/morganMiddleware.js
const morgan = require('morgan');
const logger = require('../utils/logger');

// Define the stream for Morgan to use Winston's logger
const stream = {
  write: (message) => logger.info(message.trim()),
};

// Skip logging during tests
const skip = () => {
  const env = process.env.ENV || 'development';
  return env === 'test';
};

// Custom token to extract the real IP address
morgan.token('real-ip', (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress);

// Build the Morgan middleware
const morganMiddleware = morgan(
  ':real-ip :method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);

module.exports = morganMiddleware;
