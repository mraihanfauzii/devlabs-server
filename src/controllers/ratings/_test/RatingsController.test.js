const RatingsController = require('../RatingsController');
const RatingsRepository = require('../../../repositories/ratings/RatingsRepository');
const RatingAttachmentsRepository = require('../../../repositories/ratings/RatingAttachmentsRepository');
const UsersRepository = require('../../../repositories/users/UsersRepository');
const StorageRepository = require('../../../repositories/storage/StorageRepository');
const validator = require('../../../validator');

describe('RatingsController', () => {
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

  describe('createRating', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        body: {},
        files: [],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.createRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, ratee not found', async () => {
      const mockRequest = {
        body: {},
        files: [],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.createRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, failed to create rating', async () => {
      const mockRequest = {
        body: {},
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

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.createRating = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.createRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success', async () => {
      const mockRequest = {
        body: {},
        files: [],
        user: { id: 1 },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: { attachment_files: [] } });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.createRating = jest.fn().mockResolvedValue({ error: false, data: [{ id: 'id' }] });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.createRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should return error, failed to save file', async () => {
      const mockRequest = {
        body: {},
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

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.createRating = jest.fn().mockResolvedValue({ error: false, data: [{ id: 'id' }] });
      storageRepository.saveFile = jest.fn().mockResolvedValueOnce('file1.jpg')
        .mockResolvedValueOnce(false);
      storageRepository.deleteFile = jest.fn().mockResolvedValue(true);

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.createRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success with attachments', async () => {
      const mockRequest = {
        body: {},
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

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.createRating = jest.fn().mockResolvedValue({ error: false, data: [{ id: 'id' }] });
      ratingAttachmentsRepository.createRatingAttachment = jest.fn().mockResolvedValue({ error: false });
      storageRepository.saveFile = jest.fn().mockResolvedValue('file1.jpg');
      storageRepository.deleteFile = jest.fn().mockResolvedValue(true);

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.createRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });

  describe('getRatingsByRateeId', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRateeId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, ratee not found', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRateeId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, ratings not found', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.getRatingsByRateeId = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRateeId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.getRatingsByRateeId = jest.fn().mockResolvedValue({
        error: false,
        data: [
          {
            id: 'id',
            rater_id: 1,
            rater_profile_name: 'rater',
            rater_profile_picture: 'rater.jpg',
            ratee_id: 2,
            ratee_profile_name: 'ratee',
            ratee_profile_picture: 'ratee.jpg',
            rating: 5,
            description: 'description',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
      });
      ratingAttachmentsRepository.getRatingAttachmentsByRatingId = jest.fn().mockResolvedValue({
        error: false,
        data: [{ id: 'id', file_name: 'file.jpg' }],
      });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRateeId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return success without additional data', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.getRatingsByRateeId = jest.fn().mockResolvedValue({
        error: false,
        data: [
          {
            id: 'id',
            rater_id: null,
            rater_profile_name: null,
            rater_profile_picture: null,
            ratee_id: null,
            ratee_profile_name: null,
            ratee_profile_picture: null,
            rating: 5,
            description: 'description',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
      });
      ratingAttachmentsRepository.getRatingAttachmentsByRatingId = jest.fn().mockResolvedValue({
        error: true,
        data: null,
      });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRateeId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getRatingsByRaterId', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRaterId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, rater not found', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRaterId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, ratings not found', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.getRatingsByRaterId = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRaterId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.getRatingsByRaterId = jest.fn().mockResolvedValue({
        error: false,
        data: [
          {
            id: 'id',
            rater_id: 1,
            rater_profile_name: 'rater',
            rater_profile_picture: 'rater.jpg',
            ratee_id: 2,
            ratee_profile_name: 'ratee',
            ratee_profile_picture: 'ratee.jpg',
            rating: 5,
            description: 'description',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
      });
      ratingAttachmentsRepository.getRatingAttachmentsByRatingId = jest.fn().mockResolvedValue({
        error: false,
        data: [{ id: 'id', file_name: 'file.jpg' }],
      });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRaterId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return success without additional data', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.getRatingsByRaterId = jest.fn().mockResolvedValue({
        error: false,
        data: [
          {
            id: 'id',
            rater_id: null,
            rater_profile_name: null,
            rater_profile_picture: null,
            ratee_id: null,
            ratee_profile_name: null,
            ratee_profile_picture: null,
            rating: 5,
            description: 'description',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
      });
      ratingAttachmentsRepository.getRatingAttachmentsByRatingId = jest.fn().mockResolvedValue({
        error: true,
        data: null,
      });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingsByRaterId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getRatingById', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, rating not found', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      ratingsRepository.getRatingById = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      ratingsRepository.getRatingById = jest.fn().mockResolvedValue({
        error: false,
        data: [
          {
            id: 'id',
            rater_id: 1,
            rater_profile_name: 'rater',
            rater_profile_picture: 'rater.jpg',
            ratee_id: 2,
            ratee_profile_name: 'ratee',
            ratee_profile_picture: 'ratee.jpg',
            rating: 5,
            description: 'description',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
      });
      ratingAttachmentsRepository.getRatingAttachmentsByRatingId = jest.fn().mockResolvedValue({
        error: false,
        data: [{ id: 'id', file_name: 'file.jpg' }],
      });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return success without additional data', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      ratingsRepository.getRatingById = jest.fn().mockResolvedValue({
        error: false,
        data: [
          {
            id: 'id',
            rater_id: null,
            rater_profile_name: null,
            rater_profile_picture: null,
            ratee_id: null,
            ratee_profile_name: null,
            ratee_profile_picture: null,
            rating: 5,
            description: 'description',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
      });
      ratingAttachmentsRepository.getRatingAttachmentsByRatingId = jest.fn().mockResolvedValue({
        error: true,
        data: null,
      });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRatingById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getRateeAverageRating', () => {
    it('should return error, validation error', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRateeAverageRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, ratee not found', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRateeAverageRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, failed to get average rating', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.getRateeAverageRating = jest.fn().mockResolvedValue({ error: true });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRateeAverageRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success', async () => {
      const mockRequest = {
        params: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: false, data: {} });

      const ratingsRepository = new RatingsRepository();
      const ratingAttachmentsRepository = new RatingAttachmentsRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn().mockResolvedValue({ error: false });
      ratingsRepository.getRateeAverageRating = jest.fn().mockResolvedValue({
        error: false,
        data: [
          {
            ratee_id: 1,
            average_rating: 5,
          },
        ],
      });

      const ratingsController = new RatingsController(
        ratingsRepository,
        ratingAttachmentsRepository,
        usersRepository,
        storageRepository,
      );

      await ratingsController.getRateeAverageRating(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
