const fs = require('fs');
const path = require('path');
const logger = require('../../utils/logger');

class StorageRepository {
  constructor() {
    this.baseDir = path.join(__dirname, '../../../public/');
    this.initializeStorage();
  }

  initializeStorage() {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
      logger.info(`Storage directory created: ${this.baseDir}`);
    }
  }

  async saveFile(fileData, fileName, folder = '', routePath = '') {
    try {
      const folderPath = path.join(this.baseDir, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      const filePath = path.join(folderPath, fileName);
      await fs.promises.writeFile(filePath, fileData);
      const routingPath = `${routePath ? `/${routePath}` : ''}/${fileName}`.replace(/\\/g, '/');
      logger.info(`File saved: ${filePath}, routing path: ${routingPath}`);
      return routingPath;
    } catch (err) {
      logger.error('Error saving file:', err);
      return null;
    }
  }

  async deleteFile(fileName, folder = '') {
    try {
      const filePath = path.join(this.baseDir, folder, fileName);
      await fs.promises.unlink(filePath);
      logger.info(`Deleted file: ${filePath}`);
      return true;
    } catch (err) {
      logger.error('Error deleting file:', err);
      return false;
    }
  }
}

module.exports = StorageRepository;
