const ThemesController = require('../ThemesController');
const ThemesRepository = require('../../../repositories/themes/ThemesRepository');
const ThemeClicksRepository = require('../../../repositories/themes/ThemeClicksRepository');
const validator = require('../../../validator');

describe('ThemesController', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllThemes', () => {
    it('should return error, themes not found', async () => {
      const themesRepository = new ThemesRepository();
      const themeClicksRepository = new ThemeClicksRepository();

      themesRepository.getAllThemes = jest.fn().mockResolvedValue({ error: true });

      const themesController = new ThemesController(themesRepository, themeClicksRepository);

      await themesController.getAllThemes({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const themesRepository = new ThemesRepository();
      const themeClicksRepository = new ThemeClicksRepository();

      themesRepository.getAllThemes = jest.fn().mockResolvedValue({ error: null, data: [{ id: 'id' }] });
      themeClicksRepository.getClicksByThemeId = jest.fn().mockResolvedValue({ data: [{ clicks: null }] });

      const themesController = new ThemesController(themesRepository, themeClicksRepository);

      await themesController.getAllThemes({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getThemeById', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const themesRepository = new ThemesRepository();
      const themeClicksRepository = new ThemeClicksRepository();

      const themesController = new ThemesController(themesRepository, themeClicksRepository);

      await themesController.getThemeById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, theme not found', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: { id: 'id' } });

      const themesRepository = new ThemesRepository();
      const themeClicksRepository = new ThemeClicksRepository();

      themesRepository.getThemeById = jest.fn().mockResolvedValue({ error: true });

      const themesController = new ThemesController(themesRepository, themeClicksRepository);

      await themesController.getThemeById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: { id: 'id' } });

      const themesRepository = new ThemesRepository();
      const themeClicksRepository = new ThemeClicksRepository();

      themesRepository.getThemeById = jest.fn().mockResolvedValue({ error: null, data: [{ id: 'id' }] });
      themeClicksRepository.createThemeClick = jest.fn().mockResolvedValue({ data: [{ clicks: 0 }] });
      themeClicksRepository.getClicksByThemeId = jest.fn().mockResolvedValue({ data: [{ clicks: null }] });

      const themesController = new ThemesController(themesRepository, themeClicksRepository);

      await themesController.getThemeById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getTrendingThemes', () => {
    it('should return error, themes not found', async () => {
      const themesRepository = new ThemesRepository();
      const themeClicksRepository = new ThemeClicksRepository();

      themesRepository.getTrendingThemes = jest.fn().mockResolvedValue({ error: true });

      const themesController = new ThemesController(themesRepository, themeClicksRepository);

      await themesController.getTrendingThemes({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const themesRepository = new ThemesRepository();
      const themeClicksRepository = new ThemeClicksRepository();

      themesRepository.getTrendingThemes = jest.fn().mockResolvedValue({ error: null, data: [{ id: 'id' }] });
      themeClicksRepository.getClicksByThemeId = jest.fn().mockResolvedValue({ data: [{ clicks: null }] });

      const themesController = new ThemesController(themesRepository, themeClicksRepository);

      await themesController.getTrendingThemes({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
