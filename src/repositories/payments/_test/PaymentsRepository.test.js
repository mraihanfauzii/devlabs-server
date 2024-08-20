const PaymentsRepository = require('../PaymentsRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('PaymentsRepository', () => {
  const paymentsRepository = new PaymentsRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPaymentMethod', () => {
    it('should return all payment methods', async () => {
      db.query.mockResolvedValueOnce([{ id: 1 }]);
      const result = await paymentsRepository.getAllPaymentMethod();
      expect(result).toHaveLength(1);
    });
  });

  describe('getAllPaymentMethodByID', () => {
    it('should return payment method by ID', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce([{ id: 1 }]);
      const result = await paymentsRepository.getAllPaymentMethodByID(data);
      expect(result).toHaveLength(1);
    });
  });
});
