const jwtToken = require('../jwtToken');

describe('jwtToken', () => {
  describe('generateAccessToken', () => {
    it('should return a token', () => {
      const token = jwtToken.generateAccessToken({ id: 1 });
      expect(token).toBeDefined();
    });
  });

  describe('generateRefreshToken', () => {
    it('should return a token', () => {
      const token = jwtToken.generateRefreshToken({ id: 1 });
      expect(token).toBeDefined();
    });
  });

  describe('verifyAccessToken', () => {
    it('should return a payload', () => {
      const token = jwtToken.generateAccessToken({ id: 1 });
      const payload = jwtToken.verifyAccessToken(token);
      expect(payload).toBeDefined();
    });

    it('should return null', () => {
      const payload = jwtToken.verifyAccessToken('invalid-token');
      expect(payload).toBeNull();
    });
  });

  describe('verifyRefreshToken', () => {
    it('should return a payload', () => {
      const token = jwtToken.generateRefreshToken({ id: 1 });
      const payload = jwtToken.verifyRefreshToken(token);
      expect(payload).toBeDefined();
    });

    it('should return null', () => {
      const payload = jwtToken.verifyRefreshToken('invalid-token');
      expect(payload).toBeNull();
    });
  });
});
