const db = require('../../configs/databases/postgres/db');

class PortofolioClicksRepository {
  async createPortofolioClick(data) {
    const { portofolio_id, user_id } = data;

    const query = {
      text: `
        INSERT INTO portofolio_clicks(portofolio_id, user_id)
        VALUES($1, $2)
        RETURNING id`,
      values: [portofolio_id, user_id],
    };

    const result = await db.command(query);
    return result;
  }

  async getClicksByPortofolioId(data) {
    const { portofolio_id } = data;

    const query = {
      text: `
        SELECT COUNT(id) as clicks
        FROM portofolio_clicks
        WHERE portofolio_id = $1`,
      values: [portofolio_id],
    };

    const result = await db.query(query);
    return result;
  }
}

module.exports = PortofolioClicksRepository;
