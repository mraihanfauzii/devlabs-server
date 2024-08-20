const PortofoliosRepository = require('../PortofoliosRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('PortofoliosRepository', () => {
  const portofoliosRepository = new PortofoliosRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPortofolio', () => {
    it('should return created portofolio', async () => {
      const data = {
        user_id: 1,
        title: 'Hello, world!',
        description: 'Hello, world!',
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await portofoliosRepository.createPortofolio(data);
      expect(result).toHaveProperty('id');
    });
  });

  describe('getUserPortofolios', () => {
    it('should return portofolios by user id', async () => {
      const data = {
        architect_id: 1,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofoliosRepository.getUserPortofolios(data);
      expect(result).toHaveLength(1);
    });
  });

  describe('getPortofolioById', () => {
    it('should return portofolio by id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofoliosRepository.getPortofolioById(data);
      expect(result).toHaveLength(1);
    });
  });

  describe('updatePortofolio', () => {
    it('should return updated portofolio', async () => {
      const data = {
        id: 1,
        title: 'Hello, world!',
        description: 'Hello, world!',
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await portofoliosRepository.updatePortofolio(data);
      expect(result).toHaveProperty('id');
    });
  });

  describe('deletePortofolioById', () => {
    it('should return deleted portofolio', async () => {
      const data = {
        id: 1,
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await portofoliosRepository.deletePortofolioById(data);
      expect(result).toHaveProperty('id');
    });
  });

  describe('getTrendingPortofolios', () => {
    it('should return trending portofolios', async () => {
      const data = {
        theme_id: 1,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofoliosRepository.getTrendingPortofolios(data);
      expect(result).toHaveLength(1);
    });

    it('should return trending portofolios without filter', async () => {
      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofoliosRepository.getTrendingPortofolios({});
      expect(result).toHaveLength(1);
    });
  });

  describe('getRecentPortofolios', () => {
    it('should return recent portofolios', async () => {
      const data = {
        theme_id: 1,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofoliosRepository.getRecentPortofolios(data);
      expect(result).toHaveLength(1);
    });

    it('should return recent portofolios without filter', async () => {
      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofoliosRepository.getRecentPortofolios({});
      expect(result).toHaveLength(1);
    });
  });

  describe('getFavoritePortofolios', () => {
    it('should return favorite portofolios', async () => {
      const data = {
        user_id: 1,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofoliosRepository.getFavoritePortofolios(data);
      expect(result).toHaveLength(1);
    });
  });
});
