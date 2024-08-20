const MessagesRepository = require('../MessagesRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('MessagesRepository', () => {
  const messagesRepository = new MessagesRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMessage', () => {
    it('should return created message', async () => {
      const data = {
        sender_id: 1,
        receiver_id: 2,
        message: 'Hello, world!',
      };

      db.command.mockResolvedValueOnce({ id: 1 });

      const result = await messagesRepository.createMessage(data);
      expect(result).toHaveProperty('id');
    });
  });

  describe('getMessagesBetweenUsers', () => {
    it('should return messages between users', async () => {
      const data = {
        first_user_id: 1,
        second_user_id: 2,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);

      const result = await messagesRepository.getMessagesBetweenUsers(data);
      expect(result).toHaveLength(1);
    });
  });

  describe('getLastMessagesForUser', () => {
    it('should return last messages for user', async () => {
      db.query.mockResolvedValueOnce([{ id: 1 }]);
      const result = await messagesRepository.getLastMessagesForUser(1);
      expect(result).toHaveLength(1);
    });
  });
});
