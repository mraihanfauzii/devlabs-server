const UsersRepository = require('../UsersRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('UsersRepository', () => {
  const usersRepository = new UsersRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should return registered user', async () => {
      const data = {
        email: 'email',
        password: 'password',
        profile_name: 'profile_name',
        phonenumber: 'phonenumber',
        role: 'role',
      };

      db.command.mockResolvedValueOnce({ error: null, data: [{ id: 1 }] });

      const result = await usersRepository.registerUser(data);
      expect(result.data[0]).toHaveProperty('id');
    });
  });

  describe('getUserByEmailAndRole', () => {
    it('should return user by email and role', async () => {
      const data = {
        email: 'email',
        role: 'role',
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await usersRepository.getUserByEmailAndRole(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      const data = {
        email: 'email',
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await usersRepository.getUserByEmail(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const data = {
        role: 'role',
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await usersRepository.getAllUsers(data);
      expect(result.error).toBeNull();
    });

    it('should return all users without role', async () => {
      db.query.mockResolvedValueOnce({ error: null });

      const result = await usersRepository.getAllUsers({});
      expect(result.error).toBeNull();
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await usersRepository.getUserById(data);
      expect(result.error).toBeNull();
    });
  });

  describe('updateUserProfile', () => {
    it('should return updated user profile', async () => {
      const data = {
        id: '1',
        profile_name: 'profile_name',
        profile_picture: 'profile_picture',
        profile_description: 'profile_description',
        phonenumber: 'phonenumber',
      };

      db.command.mockResolvedValueOnce({ error: null });

      const result = await usersRepository.updateUserProfile(data);
      expect(result.error).toBeNull();
    });
  });
});
