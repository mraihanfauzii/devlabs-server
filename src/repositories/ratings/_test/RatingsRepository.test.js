const RatingsRepository = require('../RatingsRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('RatingsRepository', () => {
  const ratingsRepository = new RatingsRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRating', () => {
    it('should return created rating', async () => {
      const data = {
        rater_id: 1,
        ratee_id: 1,
        rating: 1,
        description: 'Hello, world!',
      };

      db.command.mockResolvedValueOnce({ error: null, data: [{ id: 1 }] });

      const result = await ratingsRepository.createRating(data);
      expect(result.data[0]).toHaveProperty('id');
    });
  });

  describe('getRatingsByRateeId', () => {
    it('should return ratings by ratee id', async () => {
      const data = {
        ratee_id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await ratingsRepository.getRatingsByRateeId(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getRatingsByRaterId', () => {
    it('should return ratings by rater id', async () => {
      const data = {
        rater_id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await ratingsRepository.getRatingsByRaterId(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getRatingById', () => {
    it('should return rating by id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await ratingsRepository.getRatingById(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getRateeAverageRating', () => {
    it('should return ratee average rating', async () => {
      const data = {
        ratee_id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await ratingsRepository.getRateeAverageRating(data);
      expect(result.error).toBeNull();
    });
  });
});
