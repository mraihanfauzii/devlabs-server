const db = require('../../configs/databases/postgres/db');

class PortofoliosRepository {
  async createPortofolio(data) {
    const { architect_id, name, description, theme_id, estimated_budget } = data;

    const query = {
      text: `
        INSERT INTO portofolios (architect_id, name, description, theme_id, estimated_budget)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
      values: [architect_id, name, description, theme_id, estimated_budget],
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
          p.estimated_budget,
          p.theme_id,
          t.name AS theme_name,
          t.theme_image,
          p.created_at
        FROM portofolios p
        LEFT JOIN users u ON p.architect_id = u.id
        LEFT JOIN themes t ON p.theme_id = t.id
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
          p.theme_id,
          p.estimated_budget,
          t.name AS theme_name,
          t.theme_image,
          p.created_at
        FROM portofolios p
        LEFT JOIN users u ON p.architect_id = u.id
        LEFT JOIN themes t ON p.theme_id = t.id
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
    const { id, name, description, theme_id, estimated_budget } = data;

    const query = {
      text: `
        UPDATE portofolios
        SET
          name = $1,
          description = $2, 
          theme_id = $3,
          estimated_budget = $4
        WHERE id = $5
        RETURNING id`,
      values: [name, description, theme_id, estimated_budget, id],
    };

    const result = await db.command(query);
    return result;
  }
}

module.exports = PortofoliosRepository;
