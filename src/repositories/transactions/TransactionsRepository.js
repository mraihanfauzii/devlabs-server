const db = require('../../configs/databases/postgres/db');

class TransactionsRepository {
  async addTransaction(data) {
    const { project_id } = data;

    const query = {
      text: `
        INSERT INTO transactions (project_id, status, payment_method)
        VALUES ($1, $2, $3)
        RETURNING id`,
      values: [project_id, 'Menunggu pembayaran', 'BCA 894187889'],
    };

    const result = await db.command(query);
    return result;
  }

  async getTransactionById(data) {
    const { id } = data;

    const query = {
      text: 'SELECT * FROM transactions WHERE id = $1',
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }
}

module.exports = TransactionsRepository;
