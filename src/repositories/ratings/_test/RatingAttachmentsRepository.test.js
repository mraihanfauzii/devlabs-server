const RatingAttachmentsRepository = require('../RatingAttachmentsRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('RatingAttachmentsRepository', () => {
  const ratingAttachmentsRepository = new RatingAttachmentsRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRatingAttachment', () => {
    it('should return rating attachment', async () => {
      const data = {
        rating_id: 1,
        name: 'Hello, world!',
        path: 'path',
      };

      db.command.mockResolvedValueOnce({ error: null });

      const result = await ratingAttachmentsRepository.createRatingAttachment(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getRatingAttachmentsByRatingId', () => {
    it('should return rating attachments', async () => {
      const data = {
        rating_id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await ratingAttachmentsRepository.getRatingAttachmentsByRatingId(data);
      expect(result.error).toBeNull();
    });
  });
});
