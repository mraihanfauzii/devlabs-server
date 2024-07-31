const db = require('../../configs/databases/postgres/db');

class ThemesRepository {
  async getAllThemes() {
    const query = {
      text: 'SELECT * FROM themes ORDER BY name ASC',
      values: [],
    };

    const result = await db.query(query);
    return result;
  }

  async getThemeById(data) {
    const { id } = data;

    const query = {
      text: 'SELECT * FROM themes WHERE id = $1',
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }

  async getTrendingThemes() {
    const query = {
      text: `
        SELECT
          t.id,
          t.name,
          t.theme_image,
          t.created_at,
          COUNT(tc.id) as clicks
        FROM themes t
        LEFT JOIN theme_clicks tc ON t.id = tc.theme_id
        GROUP BY t.id
        ORDER BY clicks DESC`,
      values: [],
    };

    const result = await db.query(query);
    return result;
  }
}

module.exports = ThemesRepository;
