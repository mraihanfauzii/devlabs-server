const TransactionsRepository = require('../TransactionsRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('TransactionsRepository', () => {
  const transactionsRepository = new TransactionsRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactionById', () => {
    it('should return transaction by id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await transactionsRepository.getTransactionById(data);
      expect(result.error).toBeNull();
    });
  });

  describe('payBillTransactions', () => {
    it('should return pay bill transactions', async () => {
      const data = {
        payment_method: 'credit_card',
      };

      db.query.mockResolvedValueOnce({ error: null, data: [{ transaction_id: '1' }] });
      db.query.mockResolvedValueOnce({ error: null, data: [{ id: '1' }] });
      db.command.mockResolvedValueOnce({ error: null });

      const result = await transactionsRepository.payBillTransactions('1', data);
      expect(result.error).toBeNull();
    });
  });

  describe('addTransaction', () => {
    it('should return added transaction', async () => {
      const data = {
        price: 1000,
      };

      db.command.mockResolvedValueOnce({ error: null, data: [{ id: '1' }] })
        .mockResolvedValueOnce({ error: null });

      const result = await transactionsRepository.addTransaction('1', data);
      expect(result.error).toBeNull();
    });
  });
});
