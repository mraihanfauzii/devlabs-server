const db = require('../../configs/databases/postgres/db');

class PortofolioFavouritesRepository {
  async createPortofolioFavourite(data) {
    const { portofolio_id, user_id } = data;

    const query = {
      text: `
        INSERT INTO user_portofolio_favourites(portofolio_id, user_id)
        VALUES($1, $2)
        RETURNING id`,
      values: [portofolio_id, user_id],
    };

    const result = await db.command(query);
    return result;
  }

  async getPortofolioFavouriteByUserAndPortofolioId(data) {
    const { portofolio_id, user_id } = data;

    const query = {
      text: `
        SELECT *
        FROM user_portofolio_favourites
        WHERE portofolio_id = $1 AND user_id = $2`,
      values: [portofolio_id, user_id],
    };

    const result = await db.query(query);
    return result;
  }

  async deletePortofolioFavourite(data) {
    const { portofolio_id, user_id } = data;

    const query = {
      text: `
        DELETE FROM user_portofolio_favourites
        WHERE portofolio_id = $1 AND user_id = $2`,
      values: [portofolio_id, user_id],
    };

    const result = await db.command(query);
    return result;
  }
}

module.exports = PortofolioFavouritesRepository;
