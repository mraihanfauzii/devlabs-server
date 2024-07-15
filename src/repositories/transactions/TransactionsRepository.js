const db = require('../../configs/databases/postgres/db');

class TransactionsRepository {

  // Customer Section
  async getTransactionById(data) {
    const { id } = data;

    const query = {
      text: 'SELECT * FROM transactions WHERE id = $1',
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }

  async payBillTransactions(id, data) {
    console.log(id, data.payment_method)
    const query = {
        text: `
          UPDATE transactions
          SET status = $1, payment_method=$2
          WHERE id = $3
          RETURNING *`,
        values: ['Telah dibayar', data.payment_method, id],
    };
    const query1 = {
        text: `
          UPDATE projects
          SET status = $1
          WHERE transaction_id = $2
          RETURNING *`,
        values: ['Pengerjaan', id],
    };

    await db.query(query);
    const result = await db.query(query1);
    console.log(result)
    return result;
  }

  // Vendor Section 

  async addTransaction(id, data) {
    const {price} = data;
    
    const tax = price * 0.1 
    const amount = price + tax

    const makeTransactionQuery = {
      text: `
        INSERT INTO transactions (status, price, tax, amount)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      values: ['Menunggu pembayaran', price, tax, amount],
    };
    const result = await db.command(makeTransactionQuery);

    const transactionId = result.data[0].id;
    const relationTransactionProject = {
      text: `
        UPDATE projects
        SET transaction_id = $1
        WHERE id = $2
      `,
      values: [transactionId, id ]
    }
    const result1 = await db.command(relationTransactionProject);

    return result1;
  }
}

module.exports = TransactionsRepository;
