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
}

module.exports = ThemesRepository;
