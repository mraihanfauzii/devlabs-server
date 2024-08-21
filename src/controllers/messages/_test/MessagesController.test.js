const MessagesController = require('../MessagesController');
const MessagesRepository = require('../../../repositories/messages/MessagesRepository');
const UsersRepository = require('../../../repositories/users/UsersRepository');
const validator = require('../../../validator');

describe('MessagesController', () => {
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

  describe('createMessage', () => {
    it('should return error, validation fail', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'user-123' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.createMessage(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, receiver not found', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'user-123' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn()
        .mockResolvedValue({ error: true });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.createMessage(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, failed to create message', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'user-123' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn()
        .mockResolvedValue({ error: null });

      messagesRepository.createMessage = jest.fn()
        .mockResolvedValue({ error: true });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.createMessage(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should return success', async () => {
      const mockRequest = {
        body: {},
        user: { id: 'user-123' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn()
        .mockResolvedValue({ error: null });

      messagesRepository.createMessage = jest.fn()
        .mockResolvedValue({ error: null, data: [{}] });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.createMessage(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });

  describe('getMessagesBetweenUsers', () => {
    it('should return error, validation fail', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getMessagesBetweenUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, first user not found', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn()
        .mockResolvedValue({ error: true });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getMessagesBetweenUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, second user not found', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn()
        .mockResolvedValueOnce({ error: null })
        .mockResolvedValueOnce({ error: true });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getMessagesBetweenUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return error, messages not found', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn()
        .mockResolvedValue({ error: null });

      messagesRepository.getMessagesBetweenUsers = jest.fn()
        .mockResolvedValue({ error: true });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getMessagesBetweenUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn()
        .mockResolvedValue({ error: null });

      messagesRepository.getMessagesBetweenUsers = jest.fn()
        .mockResolvedValue({
          error: null,
          data: [{
            id: 'message-123',
            sender_id: 'user-123',
            sender_profile_name: 'User 123',
            sender_profile_picture: 'http://user-123.com',
            receiver_id: 'user-456',
            receiver_profile_name: 'User 456',
            receiver_profile_picture: 'http://user-456.com',
            message: 'Hello',
            created_at: '2021-08-08T07:00:00.000Z',
          }],
        });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getMessagesBetweenUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return success, with empty sender & receiver data', async () => {
      const mockRequest = {
        query: {},
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      usersRepository.getUserById = jest.fn()
        .mockResolvedValue({ error: null });

      messagesRepository.getMessagesBetweenUsers = jest.fn()
        .mockResolvedValue({
          error: null,
          data: [{
            id: 'message-123',
            sender_id: null,
            sender_profile_name: null,
            sender_profile_picture: null,
            receiver_id: null,
            receiver_profile_name: null,
            receiver_profile_picture: null,
            message: null,
            created_at: '2021-08-08T07:00:00.000Z',
          }],
        });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getMessagesBetweenUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getLastMessagesForUser', () => {
    it('should return error, validation fail', async () => {
      const mockRequest = {
        user: { id: 'user-123' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: true });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getLastMessagesForUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return error, messages not found', async () => {
      const mockRequest = {
        user: { id: 'user-123' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      messagesRepository.getLastMessagesForUser = jest.fn()
        .mockResolvedValue({ error: true });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getLastMessagesForUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return success', async () => {
      const mockRequest = {
        user: { id: 'user-123' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      messagesRepository.getLastMessagesForUser = jest.fn()
        .mockResolvedValue({
          error: null,
          data: [{
            id: 'message-123',
            contact_id: 'user-456',
            contact_profile_name: 'User 456',
            contact_profile_picture: 'http://user-456.com',
            message: 'Hello',
            created_at: '2021-08-08T07:00:00.000Z',
          },
          {
            id: 'message-124',
            contact_id: 'user-456',
            contact_profile_name: 'User 456',
            contact_profile_picture: 'http://user-456.com',
            message: 'Hello 2',
            created_at: '2021-08-08T07:00:00.000Z',
          }],
        });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getLastMessagesForUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return success, with empty contact data', async () => {
      const mockRequest = {
        user: { id: 'user-123' },
      };

      jest.spyOn(validator, 'validatePayload').mockReturnValue({ error: null, data: {} });

      const messagesRepository = new MessagesRepository();
      const usersRepository = new UsersRepository();

      messagesRepository.getLastMessagesForUser = jest.fn()
        .mockResolvedValue({
          error: null,
          data: [{
            id: 'message-123',
            contact_id: null,
            contact_profile_name: null,
            contact_profile_picture: null,
            message: 'test',
            created_at: '2021-08-08T07:00:00.000Z',
          }],
        });

      const messagesController = new MessagesController(messagesRepository, usersRepository);

      await messagesController.getLastMessagesForUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
