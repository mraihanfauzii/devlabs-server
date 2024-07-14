const db = require('../../configs/databases/postgres/db');

class PortofoliosRepository {
  async createPortofolio(data) {
    const { architect_id, name, description } = data;

    const query = {
      text: `
        INSERT INTO portofolios (architect_id, name, description)
        VALUES ($1, $2, $3)
        RETURNING id`,
      values: [architect_id, name, description],
    };

    const result = await db.command(query);
    return result;
  }

  async getUserPortofolios(data) {
    const { architect_id } = data;

    const query = {
      text: `
        SELECT *
        FROM portofolios
        WHERE architect_id = $1`,
      values: [architect_id],
    };

    const result = await db.query(query);
    return result;
  }

  async getPortofolioById(data) {
    const { id } = data;

    const query = {
      text: `
        SELECT *
        FROM portofolios
        WHERE id = $1`,
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }

  async deletePortofolioById(data) {
    const { id } = data;

    const query = {
      text: `
        DELETE FROM portofolios
        WHERE id = $1`,
      values: [id],
    };

    const result = await db.command(query);
    return result;
  }
}

module.exports = PortofoliosRepository;
