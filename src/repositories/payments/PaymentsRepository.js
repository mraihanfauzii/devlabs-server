const db = require('../../configs/databases/postgres/db');

class PaymentsRepository {
  async getAllPaymentMethod() {
    const query = {
      text: `select payments.id, payments.type, banks.name, banks.accname, banks.accnumber
        from payments
        inner join banks On payments.banks = banks.id`,
    };

    const result = await db.query(query);
    return result;
  }

  async getAllPaymentMethodByID(data) {
    const { id } = data;

    const query = {
      text: `select payments.id, payments.type, banks.name, banks.accname, banks.accnumber
            from payments
            inner join banks On payments.banks = banks.id
            where payments.id=$1`,
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }
}
module.exports = PaymentsRepository;
