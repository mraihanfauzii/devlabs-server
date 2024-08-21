const PortofoliosController = require('../PortofoliosController');
const PortofoliosRepository = require('../../../repositories/portofolios/PortofoliosRepository');
const PortofolioAttachmentsRepository = require('../../../repositories/portofolios/PortofolioAttachmentsRepository');
const PortofolioClicksRepository = require('../../../repositories/portofolios/PortofolioClicksRepository');
const PortofolioFavouritesRepository = require('../../../repositories/portofolios/PortofolioFavouritesRepository');
const UsersRepository = require('../../../repositories/users/UsersRepository');
const StorageRepository = require('../../../repositories/storage/StorageRepository');
const ThemesRepository = require('../../../repositories/themes/ThemesRepository');
const validator = require('../../../validator');

describe('PortofoliosController', () => {
  let mockResponse;
  let storageRepository;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
      send: jest.fn(),
    };

    jest.spyOn(StorageRepository.prototype, 'initializeStorage').mockImplementation(() => { });

    storageRepository = new StorageRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPortofolio', () => {
    it('should return error, validation fail', async () => {
      const mockRequest = {
        body: {},
        files: [],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.createPortofolio(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, theme not found', async () => {
      const mockRequest = {
        body: { theme_id: 1 },
        files: [],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { attachment_files: [] } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      themesRepository.getThemeById = jest.fn().mockResolvedValue({ error: true });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.createPortofolio(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, failed to create portofolio', async () => {
      const mockRequest = {
        body: { theme_id: 1 },
        files: [],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { attachment_files: [] } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      themesRepository.getThemeById = jest.fn().mockResolvedValue({ error: false, data: {} });
      portofoliosRepository.createPortofolio = jest.fn().mockResolvedValue({ error: true });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.createPortofolio(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success', async () => {
      const mockRequest = {
        body: { theme_id: 1 },
        files: [],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { attachment_files: [] } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      themesRepository.getThemeById = jest.fn().mockResolvedValue({ error: false, data: {} });
      portofoliosRepository.createPortofolio = jest.fn().mockResolvedValue({ error: false, data: {} });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.createPortofolio(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should return success with attachment files', async () => {
      const mockRequest = {
        body: { theme_id: 1 },
        files: [
          { fieldname: 'attachment_files', originalname: 'file1.jpg', buffer: Buffer.from('file1') },
          { fieldname: 'attachment_files', originalname: 'file2.jpg', buffer: Buffer.from('file2') },
        ],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({
        error: false,
        data: {
          attachment_files: [
            { fieldname: 'attachment_files', originalname: 'file1.jpg', buffer: Buffer.from('file1') },
            { fieldname: 'attachment_files', originalname: 'file2.jpg', buffer: Buffer.from('file2') },
          ],
        },
      });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      storageRepository.saveFile = jest.fn().mockResolvedValue('/file1.jpg');
      storageRepository.deleteFile = jest.fn().mockResolvedValue(true);

      themesRepository.getThemeById = jest.fn().mockResolvedValue({ error: false, data: {} });
      portofoliosRepository.createPortofolio = jest.fn().mockResolvedValue({ error: false, data: [{ id: 'id' }] });
      portofolioAttachmentsRepository.createPortofolioAttachment = jest.fn().mockResolvedValue({ error: false, data: {} });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.createPortofolio(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should return error, failed to save attachment files', async () => {
      const mockRequest = {
        body: { theme_id: 1 },
        files: [
          { fieldname: 'attachment_files', originalname: 'file1.jpg', buffer: Buffer.from('file1') },
          { fieldname: 'attachment_files', originalname: 'file2.jpg', buffer: Buffer.from('file2') },
        ],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({
        error: false,
        data: {
          attachment_files: [
            { fieldname: 'attachment_files', originalname: 'file1.jpg', buffer: Buffer.from('file1') },
            { fieldname: 'attachment_files', originalname: 'file2.jpg', buffer: Buffer.from('file2') },
          ],
        },
      });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      storageRepository.saveFile = jest.fn().mockResolvedValue(null);
      storageRepository.deleteFile = jest.fn().mockResolvedValue(true);

      themesRepository.getThemeById = jest.fn().mockResolvedValue({ error: false, data: {} });
      portofoliosRepository.createPortofolio = jest.fn().mockResolvedValue({ error: false, data: [{ id: 'id' }] });
      portofolioAttachmentsRepository.createPortofolioAttachment = jest.fn().mockResolvedValue({ error: false, data: {} });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.createPortofolio(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getPortofolioById', () => {
    it('should return error, validation fail', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.getPortofolioById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, portofolio not found', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { id: 'id' } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      portofoliosRepository.getPortofolioById = jest.fn().mockResolvedValue({ error: true });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.getPortofolioById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { id: 'id' } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      portofoliosRepository.getPortofolioById = jest.fn().mockResolvedValue({ error: false, data: [{ id: 'id' }] });
      portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId = jest.fn()
        .mockResolvedValue({ error: false, data: [{ id: 'id' }] });
      portofolioClicksRepository.createPortofolioClick = jest.fn();
      portofolioClicksRepository.getClicksByPortofolioId = jest.fn()
        .mockResolvedValue({ error: false, data: [{ clicks: 1 }] });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.getPortofolioById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getUserPortofolios', () => {
    it('should return error, validation fail', async () => {
      const mockRequest = {
        query: {},
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.getUserPortofolios(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, portofolios not found', async () => {
      const mockRequest = {
        query: {},
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { id: 'id' } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      portofoliosRepository.getUserPortofolios = jest.fn().mockResolvedValue({ error: true });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.getUserPortofolios(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const mockRequest = {
        query: {},
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { id: 'id' } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      portofoliosRepository.getUserPortofolios = jest.fn().mockResolvedValue({ error: false, data: [{ id: 'id' }] });
      portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId = jest.fn()
        .mockResolvedValue({ error: false, data: [{ id: 'id' }] });
      portofolioClicksRepository.getClicksByPortofolioId = jest.fn()
        .mockResolvedValue({ error: false, data: [{ clicks: 1 }] });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.getUserPortofolios(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('deletePortofolioById', () => {
    it('should return error, validation fail', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.deletePortofolioById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, portofolio not found', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { architect_id: 'id' } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      portofoliosRepository.getPortofolioById = jest.fn().mockResolvedValue({ error: true });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.deletePortofolioById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, user not authorized', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { architect_id: 'id' } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      portofoliosRepository.getPortofolioById = jest.fn().mockResolvedValue({ error: false, data: [{ architect_id: 'other_id' }] });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.deletePortofolioById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
    });

    it('should return error, failed to delete portofolio', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { architect_id: 'id' } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      storageRepository.deleteFile = jest.fn().mockResolvedValue(true);
      portofoliosRepository.getPortofolioById = jest.fn().mockResolvedValue({ error: false, data: [{ architect_id: 'id' }] });
      portofoliosRepository.deletePortofolioById = jest.fn().mockResolvedValue({ error: true });
      portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId = jest.fn().mockResolvedValue({ error: false });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.deletePortofolioById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success', async () => {
      const mockRequest = {
        params: { id: 'id' },
        user: { id: 'id' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { architect_id: 'id' } });

      const portofoliosRepository = new PortofoliosRepository();
      const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();
      const portofolioClicksRepository = new PortofolioClicksRepository();
      const portofolioFavouritesRepository = new PortofolioFavouritesRepository();
      const usersRepository = new UsersRepository();
      const themesRepository = new ThemesRepository();

      storageRepository.deleteFile = jest.fn().mockResolvedValue(true);
      portofoliosRepository.getPortofolioById = jest.fn().mockResolvedValue({ error: false, data: [{ architect_id: 'id' }] });
      portofoliosRepository.deletePortofolioById = jest.fn().mockResolvedValue({ error: false });
      portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId = jest.fn().mockResolvedValue({ error: false });

      const portofoliosController = new PortofoliosController(
        portofoliosRepository,
        portofolioAttachmentsRepository,
        portofolioClicksRepository,
        portofolioFavouritesRepository,
        usersRepository,
        storageRepository,
        themesRepository,
      );

      await portofoliosController.deletePortofolioById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
