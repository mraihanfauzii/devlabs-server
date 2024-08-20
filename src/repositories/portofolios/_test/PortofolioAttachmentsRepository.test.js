const PortofolioAttachmentsRepository = require('../PortofolioAttachmentsRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('PortofolioAttachmentsRepository', () => {
  const portofolioAttachmentsRepository = new PortofolioAttachmentsRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPortofolioAttachment', () => {
    it('should return created portofolio attachment', async () => {
      const data = {
        portofolio_id: 1,
        name: 'attachment.jpg',
        path: 'path/to/attachment.jpg',
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await portofolioAttachmentsRepository.createPortofolioAttachment(data);
      expect(result).toHaveProperty('id');
    });
  });

  describe('getPortofolioAttachmentsByPortofolioId', () => {
    it('should return portofolio attachments by portofolio id', async () => {
      const data = {
        portofolio_id: 1,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId(data);
      expect(result).toHaveLength(1);
    });
  });

  describe('deletePortofolioAttachmentById', () => {
    it('should return deleted portofolio attachment', async () => {
      const data = {
        id: 1,
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await portofolioAttachmentsRepository.deletePortofolioAttachmentById(data);
      expect(result).toHaveProperty('id');
    });
  });
});
