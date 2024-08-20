const ThemesRepository = require('../ThemesRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('ThemesRepository', () => {
  const themesRepository = new ThemesRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllThemes', () => {
    it('should return all themes', async () => {
      db.query.mockResolvedValueOnce({ error: null });

      const result = await themesRepository.getAllThemes();
      expect(result.error).toBeNull();
    });
  });

  describe('getThemeById', () => {
    it('should return theme by id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await themesRepository.getThemeById(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getTrendingThemes', () => {
    it('should return trending themes', async () => {
      db.query.mockResolvedValueOnce({ error: null });

      const result = await themesRepository.getTrendingThemes();
      expect(result.error).toBeNull();
    });
  });
});
