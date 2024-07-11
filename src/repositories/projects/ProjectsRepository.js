const db = require('../../configs/databases/postgres/db');

class TransactionsRepository {
  async addProject(data) {
    const { client_id, vendor_id, name } = data;

    const query = {
      text: `
        INSERT INTO projects (client_id, vendor_id, status, name)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
      values: [client_id, vendor_id, 'Menunggu konfirmasi', name],
    };

    const result = await db.command(query);
    return result;
  }

  async getProjectsByUserId(data) {
    const { id } = data;

    const query = {
      text: 'SELECT * FROM projects WHERE client_id = $1',
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }

  async deleteProjectById(data) {
    const { id } = data;

    const query = {
      text: 'DELETE FROM projects WHERE id = $1',
      values: [id],
    };

    const result = await db.command(query);
    return result;
  }

  async getProjectById(data) {
    const { id } = data;

    const query = {
      text: 'SELECT * FROM projects WHERE id = $1',
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }
}

module.exports = TransactionsRepository;
