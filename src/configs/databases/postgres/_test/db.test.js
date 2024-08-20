const { Pool } = require('pg');
const DB = require('../db');
const logger = require('../../../../utils/logger');
const dataWrapper = require('../../../../utils/dataWrapper');

// Mocking external dependencies
jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

jest.mock('../../../../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../../../utils/dataWrapper', () => ({
  data: jest.fn(),
  error: jest.fn(),
}));

describe('DB', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialConnect', () => {
    it('should connect to the database successfully', async () => {
      pool.connect.mockResolvedValueOnce({ release: jest.fn() });
      await DB.initialConnect();
      expect(logger.info).toHaveBeenCalledWith('Initial database connection successful');
    });

    it('should retry connection on failure', async () => {
      pool.connect.mockRejectedValueOnce(new Error('Connection failed'));
      pool.connect.mockResolvedValueOnce({ release: jest.fn() });

      await DB.initialConnect(20);

      expect(logger.error).toHaveBeenCalledWith('Initial database connection error (attempt 1):', expect.any(Error));
      expect(logger.info).toHaveBeenCalledWith('Retrying database connection (attempt 2)...');
      expect(logger.info).toHaveBeenCalledWith('Initial database connection successful');
    }, 20000);

    it('should stop retrying after max retries', async () => {
      pool.connect.mockRejectedValue(new Error('Connection failed'));

      await DB.initialConnect(20);

      expect(logger.info).toHaveBeenCalledWith('Continuing to run server without database connection');
    }, 50000);
  });

  describe('query', () => {
    it('should return data on successful query', async () => {
      const mockRows = [{ id: 1 }];
      pool.connect.mockResolvedValueOnce({
        query: jest.fn().mockResolvedValueOnce({ rows: mockRows, rowCount: 1 }),
        release: jest.fn(),
      });

      await DB.query('SELECT * FROM table');

      expect(dataWrapper.data).toHaveBeenCalledWith(mockRows);
    });

    it('should handle query errors', async () => {
      pool.connect.mockResolvedValueOnce({
        query: jest.fn().mockRejectedValueOnce(new Error('Query failed')),
        release: jest.fn(),
      });

      await DB.query('SELECT * FROM table');

      expect(logger.error).toHaveBeenCalledWith('Database query error:', expect.any(Error));
      expect(dataWrapper.error).toHaveBeenCalledWith('Query failed');
    });

    it('should handle no data returned', async () => {
      pool.connect.mockResolvedValueOnce({
        query: jest.fn().mockResolvedValueOnce({ rows: [], rowCount: 0 }),
        release: jest.fn(),
      });

      await DB.query('SELECT * FROM table');

      expect(dataWrapper.error).toHaveBeenCalledWith('No data returned from query');
    });
  });

  describe('command', () => {
    it('should commit transaction on successful query', async () => {
      const mockClient = {
        query: jest.fn()
          .mockResolvedValueOnce()
          .mockResolvedValueOnce({ rows: [{ id: 1 }], rowCount: 1 })
          .mockResolvedValueOnce(),
        release: jest.fn(),
      };
      pool.connect.mockResolvedValueOnce(mockClient);

      await DB.command('INSERT INTO table VALUES ($1)', [1]);

      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('INSERT INTO table VALUES ($1)', [1]);
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
      expect(dataWrapper.data).toHaveBeenCalledWith([{ id: 1 }]);
    });

    it('should rollback transaction on query failure', async () => {
      const mockClient = {
        query: jest.fn()
          .mockResolvedValueOnce()
          .mockRejectedValueOnce(new Error('Query failed')),
        release: jest.fn(),
      };
      pool.connect.mockResolvedValueOnce(mockClient);

      await DB.command('INSERT INTO table VALUES ($1)', [1]);

      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
      expect(logger.error).toHaveBeenCalledWith('Database query error:', expect.any(Error));
      expect(dataWrapper.error).toHaveBeenCalledWith('Query failed');
    });

    it('should handle no data returned', async () => {
      const mockClient = {
        query: jest.fn()
          .mockResolvedValueOnce()
          .mockResolvedValueOnce({ rows: [], rowCount: 0 })
          .mockResolvedValueOnce(),
        release: jest.fn(),
      };
      pool.connect.mockResolvedValueOnce(mockClient);

      await DB.command('INSERT INTO table VALUES ($1)', [1]);

      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('INSERT INTO table VALUES ($1)', [1]);
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
      expect(dataWrapper.error).toHaveBeenCalledWith('No data returned from query');
    });
  });
});
