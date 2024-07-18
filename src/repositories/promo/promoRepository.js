const db = require('../../configs/databases/postgres/db');

class PromoRepository {  
    async getPromo() {
        console.log("first")
      const query = {
        text: `
            SELECT *
            from promos`,
      };
  
      const result = await db.query(query);
      return result;
    }
}
module.exports = PromoRepository;
  