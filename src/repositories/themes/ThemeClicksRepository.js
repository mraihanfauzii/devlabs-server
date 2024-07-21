const db = require('../../configs/databases/postgres/db');

class ThemeClicksRepository {
  async createThemeClick(data) {
    const { theme_id, user_id } = data;

    const query = {
      text: `
        INSERT INTO theme_clicks(theme_id, user_id)
        VALUES($1, $2)
        RETURNING id`,
      values: [theme_id, user_id],
    };

    const result = await db.command(query);
    return result;
  }

  async getClicksByThemeId(data) {
    const { theme_id } = data;

    const query = {
      text: `
        SELECT COUNT(id) as clicks
        FROM theme_clicks
        WHERE theme_id = $1`,
      values: [theme_id],
    };

    const result = await db.query(query);
    return result;
  }
}

module.exports = ThemeClicksRepository;
