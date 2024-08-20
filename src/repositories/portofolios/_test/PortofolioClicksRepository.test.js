const PortofolioClicksRepository = require('../PortofolioClicksRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('PortofolioClicksRepository', () => {
  const portofolioClicksRepository = new PortofolioClicksRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPortofolioClick', () => {
    it('should return created portofolio click', async () => {
      const data = {
        portofolio_id: 1,
        user_id: 1,
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await portofolioClicksRepository.createPortofolioClick(data);
      expect(result).toHaveProperty('id');
    });
  });

  describe('getClicksByPortofolioId', () => {
    it('should return clicks by portofolio id', async () => {
      const data = {
        portofolio_id: 1,
      };

      db.query.mockResolvedValueOnce([{ clicks: 1 }]);

      const result = await portofolioClicksRepository.getClicksByPortofolioId(data);
      expect(result).toHaveLength(1);
    });
  });
});
