const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
const jwtRefreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const jwtRefreshTokenExpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d';

const generateAccessToken = (payload) => jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });

const generateRefreshToken = (payload) => jwt.sign(payload, jwtRefreshSecret, { expiresIn: jwtRefreshTokenExpiresIn });

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
