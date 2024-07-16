const db = require('../../configs/databases/postgres/db');

class projectsRepository {

  // Customer Section

  async addProject(data) {
    const { client_id, vendor_id, name, notes } = data;

    const query = {
      text: `
        INSERT INTO projects (client_id, vendor_id, status, name, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
      values: [client_id, vendor_id, 'Menunggu konfirmasi', name, notes],
    };

    const result = await db.command(query);
    return result;
  }

  async finishPaymentProject(data) {
    const  id  = data;
    const query = {
      text: `
        UPDATE projects
        SET status = $1
        WHERE id = $2`,
      values: ['Pengerjaan', id],
    };

    const result = await db.query(query);
    return result;
  }
  
  async getProjectsByUserId(data, role) {
    console.log(role)
    const { id } = data;
    if(role === 'client'){
      var query = {
        text: `
          SELECT 
            projects.id, 
            projects.name, 
            projects.status, 
            projects.notes, 
            projects.client_id, 
            projects.vendor_id, 
            transactions.id as transaction_id, 
            transactions.status as status_transaction, 
            transactions.price, 
            transactions.tax, 
            transactions.amount
          FROM projects 
          inner join transactions on projects.transaction_id=transactions.id
          WHERE projects.client_id = $1`,
        values: [id],
      };
    }else{
      var query = {
        text: `
          SELECT 
            projects.id, 
            projects.name, 
            projects.status, 
            projects.notes, 
            projects.client_id, 
            projects.vendor_id, 
            transactions.id as transaction_id, 
            transactions.status as status_transaction, 
            transactions.price, 
            transactions.tax, 
            transactions.amount
          FROM projects 
          inner join transactions on projects.transaction_id=transactions.id
          WHERE projects.vendor_id = $1`,
        values: [id],
      };
    }

    const result = await db.query(query);
    return result;
  }

  async deleteProjectById(data) {
    const { id } = data;

    const query = {
      text: 'DELETE FROM projects WHERE id = $1',
      values: [id],
    };

    const result = await db.command(query);
    return result;
  }

  async getProjectsById(data) {
    const { id } = data;
    const query = {
      text: `
        SELECT 
          projects.id, 
          projects.name, 
          projects.status, 
          projects.notes, 
          projects.client_id, 
          projects.vendor_id, 
          transactions.id as transaction_id, 
          transactions.status as status_transaction, 
          transactions.price, 
          transactions.tax, 
          transactions.amount
        FROM projects 
        inner join transactions on projects.transaction_id=transactions.id
        WHERE projects.id = $1`,
      values: [id],
    };

    const result = await db.query(query);
    console.log(id)
    console.log(result)
    return result;
  }

  async finishProject(data) {
    const  id  = data;
    const query = {
      text: `
        UPDATE projects
        SET status = $1
        WHERE id = $2`,
      values: ['Selesai', id],
    };
    const result = await db.query(query);

    return result;
  }

  // Vendor Section

  async accProject(data) {
    const  id  = data;
    const query = {
      text: `
        UPDATE projects
        SET status = $1
        WHERE id = $2`,
      values: ['Pembayaran', id],
    };
    const result = await db.query(query);

    return result;
  }

  async checkProject(data) {
    const  id  = data;
    const query = {
      text: `
        UPDATE projects
        SET status = $1
        WHERE id = $2`,
      values: ['Pengecekan', id],
    };
    const result = await db.query(query);

    return result;
  }
}

module.exports = projectsRepository;
