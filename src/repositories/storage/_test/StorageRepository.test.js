const fs = require('fs');
const path = require('path');
const logger = require('../../../utils/logger');
const StorageRepository = require('../StorageRepository');

jest.mock('fs');
jest.mock('../../../utils/logger');

describe('StorageRepository', () => {
  let storageRepository;
  const baseDir = path.join(__dirname, '../../../../public/');

  beforeEach(() => {
    // Mock fs functions
    fs.existsSync.mockImplementation(() => false); // Default mock implementation
    fs.mkdirSync.mockImplementation(() => { });

    // Mock fs.promises methods by overriding fs.promises directly
    fs.promises = {
      writeFile: jest.fn().mockResolvedValue(undefined),
      unlink: jest.fn().mockResolvedValue(undefined),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should not create the storage directory if it already exists', () => {
      fs.existsSync.mockImplementation(() => true);

      storageRepository = new StorageRepository();

      expect(fs.existsSync).toHaveBeenCalledWith(baseDir);
      expect(fs.mkdirSync).not.toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalledWith(`Storage directory created: ${baseDir}`);
    });

    it('should create the storage directory if it does not exist', () => {
      storageRepository = new StorageRepository();
      expect(fs.existsSync).toHaveBeenCalledWith(baseDir);
      expect(fs.mkdirSync).toHaveBeenCalledWith(baseDir, { recursive: true });
      expect(logger.info).toHaveBeenCalledWith(`Storage directory created: ${baseDir}`);
    });
  });

  describe('saveFile', () => {
    it('should save a file and return the routing path', async () => {
      const fileData = 'file content';
      const fileName = 'testFile.txt';
      const folder = 'testFolder';
      const routePath = 'files';

      fs.existsSync.mockImplementation((dirPath) => dirPath === path.join(baseDir, folder));

      const routingPath = await storageRepository.saveFile(fileData, fileName, folder, routePath);

      expect(fs.existsSync).toHaveBeenCalledWith(path.join(baseDir, folder));
      expect(fs.promises.writeFile).toHaveBeenCalledWith(path.join(baseDir, folder, fileName), fileData);
      expect(logger.info).toHaveBeenCalledWith(`File saved: ${path.join(baseDir, folder, fileName)}, routing path: /${routePath}/${fileName}`);
      expect(routingPath).toBe(`/${routePath}/${fileName}`);
    });

    it('should save a file with default folder and routing path', async () => {
      const fileData = 'file content';
      const fileName = 'testFile.txt';

      fs.existsSync.mockImplementation((dirPath) => dirPath === baseDir);

      const routingPath = await storageRepository.saveFile(fileData, fileName);

      expect(fs.existsSync).toHaveBeenCalledWith(baseDir);
      expect(fs.promises.writeFile).toHaveBeenCalledWith(path.join(baseDir, fileName), fileData);
      expect(logger.info).toHaveBeenCalledWith(`File saved: ${path.join(baseDir, fileName)}, routing path: /${fileName}`);
      expect(routingPath).toBe(`/${fileName}`);
    });

    it('should handle errors and return null', async () => {
      const fileData = 'file content';
      const fileName = 'testFile.txt';
      const folder = 'testFolder';
      const routePath = 'files';

      fs.promises.writeFile.mockRejectedValue(new Error('Write error'));

      const routingPath = await storageRepository.saveFile(fileData, fileName, folder, routePath);

      expect(logger.error).toHaveBeenCalledWith('Error saving file:', expect.any(Error));
      expect(routingPath).toBeNull();
    });
  });

  describe('deleteFile', () => {
    it('should delete a file and return true', async () => {
      const fileName = 'testFile.txt';
      const folder = 'testFolder';

      const result = await storageRepository.deleteFile(fileName, folder);

      expect(fs.promises.unlink).toHaveBeenCalledWith(path.join(baseDir, folder, fileName));
      expect(logger.info).toHaveBeenCalledWith(`Deleted file: ${path.join(baseDir, folder, fileName)}`);
      expect(result).toBe(true);
    });

    it('should delete a file with default folder', async () => {
      const fileName = 'testFile.txt';

      const result = await storageRepository.deleteFile(fileName);

      expect(fs.promises.unlink).toHaveBeenCalledWith(path.join(baseDir, fileName));
      expect(logger.info).toHaveBeenCalledWith(`Deleted file: ${path.join(baseDir, fileName)}`);
      expect(result).toBe(true);
    });

    it('should handle errors and return false', async () => {
      const fileName = 'testFile.txt';
      const folder = 'testFolder';

      fs.promises.unlink.mockRejectedValue(new Error('Delete error'));

      const result = await storageRepository.deleteFile(fileName, folder);

      expect(logger.error).toHaveBeenCalledWith('Error deleting file:', expect.any(Error));
      expect(result).toBe(false);
    });
  });
});
