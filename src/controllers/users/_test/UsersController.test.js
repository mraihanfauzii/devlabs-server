const redis = require('redis');
const bcrypt = require('bcrypt');
const jwtToken = require('../../../auth/jwtToken');
const UsersController = require('../UsersController');
const UsersRepository = require('../../../repositories/users/UsersRepository');
const StorageRepository = require('../../../repositories/storage/StorageRepository');
const RedisRepository = require('../../../repositories/redis/RedisRepository');
const validator = require('../../../validator');

jest.mock('redis');
jest.mock('bcrypt');
jest.mock('../../../auth/jwtToken', () => ({
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
}));

describe('UsersController', () => {
  let mockResponse;
  let storageRepository;
  let redisRepository;
  let mockClient;

  beforeEach(() => {
    mockClient = {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
      connect: jest.fn(),
      on: jest.fn(),
    };

    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
      send: jest.fn(),
    };

    redis.createClient.mockReturnValue(mockClient);
    jest.spyOn(StorageRepository.prototype, 'initializeStorage').mockImplementation(() => { });

    redisRepository = new RedisRepository();
    storageRepository = new StorageRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const usersRepository = new UsersRepository();

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, email already exist', async () => {
      const mockRequest = {
        body: {
          email: 'email',
        },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { email: 'email' } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserByEmail = jest.fn().mockReturnValue({ error: false, data: { email: 'email' } });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, failed to register user', async () => {
      const mockRequest = {
        body: {
          email: 'email',
        },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { email: 'email' } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserByEmail = jest.fn().mockReturnValue({ error: false, data: null });
      usersRepository.registerUser = jest.fn().mockReturnValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success, user successfully registered', async () => {
      const mockRequest = {
        body: {
          email: 'email',
        },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { email: 'email' } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserByEmail = jest.fn().mockReturnValue({ error: false, data: null });
      usersRepository.registerUser = jest.fn().mockReturnValue({ error: false, data: [{}] });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });

  describe('login', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const usersRepository = new UsersRepository();

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, wrong email', async () => {
      const mockRequest = {
        body: {
          email: 'email',
        },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { email: 'email' } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserByEmailAndRole = jest.fn().mockReturnValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, wrong password', async () => {
      const mockRequest = {
        body: {
          email: 'email',
          password: 'not password',
        },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { email: 'email' } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserByEmailAndRole = jest.fn().mockReturnValue({ error: false, data: [{ password: 'password' }] });

      bcrypt.compare.mockResolvedValue(false);

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, set key redis failed', async () => {
      const mockRequest = {
        body: {
          email: 'email',
          password: 'password',
        },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { email: 'email' } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserByEmailAndRole = jest.fn().mockReturnValue({ error: false, data: [{ password: 'password' }] });
      bcrypt.compare.mockResolvedValue(true);
      redisRepository.set = jest.fn().mockResolvedValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success, user successfully logged in', async () => {
      const mockRequest = {
        body: {
          email: 'email',
          password: 'password',
        },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { email: 'email' } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserByEmailAndRole = jest.fn().mockReturnValue({ error: false, data: [{ password: 'password' }] });
      bcrypt.compare.mockResolvedValue(true);
      redisRepository.set = jest.fn().mockResolvedValue({ error: false });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getAllUsers', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const usersRepository = new UsersRepository();

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, users not found', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const usersRepository = new UsersRepository();

      usersRepository.getAllUsers = jest.fn().mockReturnValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success, all users successfully fetched', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const usersRepository = new UsersRepository();

      usersRepository.getAllUsers = jest.fn().mockReturnValue({ error: false, data: [{}] });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getUserByToken', () => {
    it('should return error, user not found', async () => {
      const mockRequest = {
        user: {
          id: 'id',
        },
      };

      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockReturnValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.getUserByToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success, user successfully fetched', async () => {
      const mockRequest = {
        user: {
          id: 'id',
        },
      };

      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockReturnValue({ error: false, data: [{}] });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.getUserByToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('updateUserProfile', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'id' },
        files: [],
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const usersRepository = new UsersRepository();

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, user not found', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'id' },
        files: [],
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockReturnValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, failed to update user', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'id' },
        files: [],
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { profile_picture: [] } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockReturnValue({ error: false, data: [{}] });
      usersRepository.updateUserProfile = jest.fn().mockReturnValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success, user profile successfully updated', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'id' },
        files: [],
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { profile_picture: [] } });

      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockReturnValue({ error: false, data: [{}] });
      usersRepository.updateUserProfile = jest.fn().mockReturnValue({ error: false, data: [{}] });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return error, failed to save profile picture', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'id' },
        files: [
          { fieldName: 'profile_picture', originalName: 'originalName', buffer: Buffer.from('buffer') },
        ],
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({
        error: false,
        data: {
          profile_picture: [
            { fieldName: 'profile_picture', originalName: 'originalName', buffer: Buffer.from('buffer') },
          ],
        },
      });

      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockReturnValue({ error: false, data: [{}] });
      usersRepository.updateUserProfile = jest.fn().mockReturnValue({ error: false, data: [{}] });

      storageRepository.saveFile = jest.fn().mockReturnValue(null);

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success, user profile successfully updated with profile picture', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'id' },
        files: [
          { fieldName: 'profile_picture', originalName: 'originalName', buffer: Buffer.from('buffer') },
        ],
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({
        error: false,
        data: {
          profile_picture: [
            { fieldName: 'profile_picture', originalName: 'originalName', buffer: Buffer.from('buffer') },
          ],
        },
      });

      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockReturnValue({
        error: false,
        data: [
          {
            profile_picture: '/profile_picture',
          },
        ],
      });
      usersRepository.updateUserProfile = jest.fn().mockReturnValue({ error: false, data: [{}] });

      storageRepository.saveFile = jest.fn().mockResolvedValue('file');
      storageRepository.deleteFile = jest.fn().mockResolvedValue(true);

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.updateUserProfile(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('logout', () => {
    it('should return error, failed to delete key', async () => {
      const mockRequest = {
        user: { id: 'id' },
      };

      const usersRepository = new UsersRepository();

      redisRepository.delete = jest.fn().mockResolvedValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.logout(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success, user successfully logged out', async () => {
      const mockRequest = {
        user: { id: 'id' },
      };

      const usersRepository = new UsersRepository();

      redisRepository.delete = jest.fn().mockResolvedValue({ error: false });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.logout(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('refreshToken', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const usersRepository = new UsersRepository();

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.refreshToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, invalid refresh token', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const usersRepository = new UsersRepository();

      jest.spyOn(jwtToken, 'verifyRefreshToken').mockReturnValue(null);

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.refreshToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, failed to get old refresh token', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { token: 'token' } });

      const usersRepository = new UsersRepository();

      jest.spyOn(jwtToken, 'verifyRefreshToken').mockReturnValue({ id: 'id' });

      redisRepository.get = jest.fn().mockResolvedValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.refreshToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return error, invalid refresh token', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { token: 'token' } });

      const usersRepository = new UsersRepository();

      jest.spyOn(jwtToken, 'verifyRefreshToken').mockReturnValue({ id: 'id' });

      redisRepository.get = jest.fn().mockResolvedValue({ error: false, data: 'different token' });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.refreshToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, user not found', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { token: 'token' } });

      const usersRepository = new UsersRepository();

      jest.spyOn(jwtToken, 'verifyRefreshToken').mockReturnValue({ id: 'id' });

      redisRepository.get = jest.fn().mockResolvedValue({ error: false, data: 'token' });
      usersRepository.getUserById = jest.fn().mockReturnValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.refreshToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, set key redis failed', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { token: 'token' } });

      const usersRepository = new UsersRepository();

      jest.spyOn(jwtToken, 'verifyRefreshToken').mockReturnValue({ id: 'id' });

      redisRepository.get = jest.fn().mockResolvedValue({ error: false, data: 'token' });
      usersRepository.getUserById = jest.fn().mockReturnValue({ error: false, data: [{}] });
      redisRepository.set = jest.fn().mockResolvedValue({ error: true });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.refreshToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success, token successfully refreshed', async () => {
      const mockRequest = {
        body: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { token: 'token' } });

      const usersRepository = new UsersRepository();

      jest.spyOn(jwtToken, 'verifyRefreshToken').mockReturnValue({ id: 'id' });

      redisRepository.get = jest.fn().mockResolvedValue({ error: false, data: 'token' });
      usersRepository.getUserById = jest.fn().mockReturnValue({ error: false, data: [{}] });
      redisRepository.set = jest.fn().mockResolvedValue({ error: false });

      const usersController = new UsersController(usersRepository, storageRepository, redisRepository);

      await usersController.refreshToken(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
