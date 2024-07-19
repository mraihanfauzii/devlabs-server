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
        SELECT
          p.id,
          p.architect_id,
          u.profile_name AS architect_name,
          u.profile_picture AS architect_picture,
          p.name,
          p.description,
          p.created_at
        FROM portofolios p
        LEFT JOIN users u ON p.architect_id = u.id
        WHERE p.architect_id = $1`,
      values: [architect_id],
    };

    const result = await db.query(query);
    return result;
  }

  async getPortofolioById(data) {
    const { id } = data;

    const query = {
      text: `
        SELECT
          p.id,
          p.architect_id,
          u.profile_name AS architect_name,
          u.profile_picture AS architect_picture,
          p.name,
          p.description,
          p.created_at
        FROM portofolios p
        LEFT JOIN users u ON p.architect_id = u.id
        WHERE p.id = $1`,
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

  async updatePortofolio(data) {
    const { id, name, description } = data;

    const query = {
      text: `
        UPDATE portofolios
        SET name = $1, description = $2
        WHERE id = $3
        RETURNING id`,
      values: [name, description, id],
    };

    const result = await db.command(query);
    return result;
  }
}

module.exports = PortofoliosRepository;
