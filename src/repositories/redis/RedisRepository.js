const redis = require('redis');
const logger = require('../../utils/logger');
const dataWrapper = require('../../utils/dataWrapper');

class RedisRepository {
  constructor() {
    this.client = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        index: process.env.REDIS_DB_INDEX || 0,
      },
      password: process.env.REDIS_PASSWORD || null,
      database: process.env.REDIS_DB_INDEX || 0,
    });

    this.client.on('error', (error) => {
      logger.error('Redis error:', error);
    });

    this.client.on('connect', () => {
      logger.info('Redis connected');
    });

    this.client.connect();
  }

  async set(key, value) {
    try {
      await this.client.set(key, value);
      logger.info(`Key set successfully for: ${key}`);
      return dataWrapper.data('Key set successfully');
    } catch (error) {
      logger.error('Failed to set key: ', error);
      return dataWrapper.error('Failed to set key');
    }
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return dataWrapper.data(value);
    } catch (error) {
      logger.error('Failed to get key: ', error);
      return dataWrapper.error('Failed to get key');
    }
  }

  async delete(key) {
    try {
      await this.client.del(key);
      logger.info(`Key deleted successfully for: ${key}`);
      return dataWrapper.data('Key deleted successfully');
    } catch (error) {
      logger.error('Failed to delete key: ', error);
      return dataWrapper.error('Failed to delete key');
    }
  }
}

module.exports = RedisRepository;
