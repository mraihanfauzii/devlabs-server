const PromoRepository = require('../promoRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('PromoRepository', () => {
  const promoRepository = new PromoRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPromo', () => {
    it('should return promos', async () => {
      db.query.mockResolvedValueOnce({ error: null });

      const result = await promoRepository.getPromo();
      expect(result.error).toBeNull();
    });
  });
});
