const db = require('../../configs/databases/postgres/db');

class promoRepository {  
    async getPromo() {

      const query = {
        text: `
            SELECT *
            from promos`,
      };
  
      const result = await db.query(query);
      return result;
    }
}
module.exports = promoRepository;
  