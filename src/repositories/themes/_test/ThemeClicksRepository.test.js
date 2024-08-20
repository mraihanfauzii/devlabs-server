const ThemeClicksRepository = require('../ThemeClicksRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('ThemeClicksRepository', () => {
  const themeClicksRepository = new ThemeClicksRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createThemeClick', () => {
    it('should return created theme click', async () => {
      const data = {
        theme_id: 1,
        user_id: 1,
      };

      db.command.mockResolvedValueOnce({ error: null });

      const result = await themeClicksRepository.createThemeClick(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getClicksByThemeId', () => {
    it('should return clicks by theme id', async () => {
      const data = {
        theme_id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await themeClicksRepository.getClicksByThemeId(data);
      expect(result.error).toBeNull();
    });
  });
});
