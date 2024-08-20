const redis = require('redis');
const RedisRepository = require('../RedisRepository'); // Adjust the path to RedisRepository
const logger = require('../../../utils/logger');
const dataWrapper = require('../../../utils/dataWrapper');

jest.mock('redis');
jest.mock('../../../utils/logger');
jest.mock('../../../utils/dataWrapper');

describe('RedisRepository', () => {
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

    redis.createClient.mockReturnValue(mockClient);

    redisRepository = new RedisRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a Redis client and set up event listeners', () => {
      expect(redis.createClient).toHaveBeenCalledWith({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        index: process.env.REDIS_DB_INDEX || 0,
      });
      expect(mockClient.connect).toHaveBeenCalled();
      expect(mockClient.on).toHaveBeenCalledWith('error', expect.any(Function));
      expect(mockClient.on).toHaveBeenCalledWith('connect', expect.any(Function));
    });
  });

  describe('set', () => {
    it('should set a key and return success message', async () => {
      mockClient.set.mockResolvedValue('OK');
      dataWrapper.data.mockReturnValue({ success: true, message: 'Key set successfully' });

      const result = await redisRepository.set('testKey', 'testValue');

      expect(mockClient.set).toHaveBeenCalledWith('testKey', 'testValue');
      expect(logger.info).toHaveBeenCalledWith('Key set successfully for: testKey');
      expect(result).toEqual({ success: true, message: 'Key set successfully' });
    });

    it('should handle errors and return an error message', async () => {
      mockClient.set.mockRejectedValue(new Error('Redis error'));
      dataWrapper.error.mockReturnValue({ success: false, message: 'Failed to set key' });

      const result = await redisRepository.set('testKey', 'testValue');

      expect(mockClient.set).toHaveBeenCalledWith('testKey', 'testValue');
      expect(logger.error).toHaveBeenCalledWith('Failed to set key: ', expect.any(Error));
      expect(result).toEqual({ success: false, message: 'Failed to set key' });
    });
  });

  describe('get', () => {
    it('should get a key and return its value', async () => {
      mockClient.get.mockResolvedValue('testValue');
      dataWrapper.data.mockReturnValue({ success: true, data: 'testValue' });

      const result = await redisRepository.get('testKey');

      expect(mockClient.get).toHaveBeenCalledWith('testKey');
      expect(result).toEqual({ success: true, data: 'testValue' });
    });

    it('should handle errors and return an error message', async () => {
      mockClient.get.mockRejectedValue(new Error('Redis error'));
      dataWrapper.error.mockReturnValue({ success: false, message: 'Failed to get key' });

      const result = await redisRepository.get('testKey');

      expect(mockClient.get).toHaveBeenCalledWith('testKey');
      expect(logger.error).toHaveBeenCalledWith('Failed to get key: ', expect.any(Error));
      expect(result).toEqual({ success: false, message: 'Failed to get key' });
    });
  });

  describe('delete', () => {
    it('should delete a key and return success message', async () => {
      mockClient.del.mockResolvedValue(1); // Redis returns the number of deleted keys
      dataWrapper.data.mockReturnValue({ success: true, message: 'Key deleted successfully' });

      const result = await redisRepository.delete('testKey');

      expect(mockClient.del).toHaveBeenCalledWith('testKey');
      expect(logger.info).toHaveBeenCalledWith('Key deleted successfully for: testKey');
      expect(result).toEqual({ success: true, message: 'Key deleted successfully' });
    });

    it('should handle errors and return an error message', async () => {
      mockClient.del.mockRejectedValue(new Error('Redis error'));
      dataWrapper.error.mockReturnValue({ success: false, message: 'Failed to delete key' });

      const result = await redisRepository.delete('testKey');

      expect(mockClient.del).toHaveBeenCalledWith('testKey');
      expect(logger.error).toHaveBeenCalledWith('Failed to delete key: ', expect.any(Error));
      expect(result).toEqual({ success: false, message: 'Failed to delete key' });
    });
  });
});
