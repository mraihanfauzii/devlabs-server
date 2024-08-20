const hashPassword = require('../hashPassword');

describe('hashPassword', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should return hashed password', async () => {
      const hashedPassword = await hashPassword.hashPassword('password');
      expect(hashedPassword).not.toEqual('password');
    });
  });

  describe('comparePassword', () => {
    it('should return true if password is correct', async () => {
      const hashedPassword = await hashPassword.hashPassword('password');
      const result = await hashPassword.comparePassword('password', hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false if password is incorrect', async () => {
      const hashedPassword = await hashPassword.hashPassword('password');
      const result = await hashPassword.comparePassword('wrongpassword', hashedPassword);
      expect(result).toBe(false);
    });
  });
});
