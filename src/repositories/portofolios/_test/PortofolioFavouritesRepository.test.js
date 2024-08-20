const PortofolioFavouritesRepository = require('../PortofolioFavouritesRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('PortofolioFavouritesRepository', () => {
  const portofolioFavouritesRepository = new PortofolioFavouritesRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPortofolioFavourite', () => {
    it('should return created portofolio favourite', async () => {
      const data = {
        portofolio_id: 1,
        user_id: 1,
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await portofolioFavouritesRepository.createPortofolioFavourite(data);
      expect(result).toHaveProperty('id');
    });
  });

  describe('getPortofolioFavouriteByUserAndPortofolioId', () => {
    it('should return favourites by portofolio id', async () => {
      const data = {
        portofolio_id: 1,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofolioFavouritesRepository.getPortofolioFavouriteByUserAndPortofolioId(data);
      expect(result).toHaveLength(1);
    });
  });

  describe('deletePortofolioFavourite', () => {
    it('should return deleted portofolio favourite', async () => {
      const data = {
        portofolio_id: 1,
        user_id: 1,
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await portofolioFavouritesRepository.deletePortofolioFavourite(data);
      expect(result).toHaveProperty('id');
    });
  });
});
