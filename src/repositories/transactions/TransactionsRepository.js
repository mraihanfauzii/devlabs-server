const db = require('../../configs/databases/postgres/db');

class TransactionsRepository {

  // Customer Section
  async getTransactionById(data) {
    const { id } = data;

    const query = {
      text: `
        SELECT transactions.*
        FROM transactions
        LEFT JOIN projects ON transactions.id = projects.transaction_id
        WHERE projects.id = $1`,
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }

  async payBillTransactions(id, data) {
    console.log(id)
    const getTransactionId = {
      text: `
        SELECT transaction_id
        FROM projects
        WHERE id = $1`,
      values: [id],
    };
    const TransactionId = await db.query(getTransactionId);
    console.log(">>",TransactionId.data[0].transaction_id)

    const query = {
        text: `
          UPDATE transactions
          SET status = $1, payment_method=$2
          WHERE id = $3
          RETURNING *`,
        values: ['Telah dibayar', data.payment_method, TransactionId.data[0].transaction_id],
    };
    

    const query1 = {
        text: `
          UPDATE projects
          SET status = $1
          WHERE id = $2
          RETURNING *`,
        values: ['Pengerjaan', id],
    };
    const result = await db.query(query1);

    const query2 = {
      text: `
        INSERT INTO status_detail (project_id, name, "desc")
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [id, "Transaksi selesai", "Pengerjaan akan segera dilakukan"],
    };
    await db.command(query2);

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
