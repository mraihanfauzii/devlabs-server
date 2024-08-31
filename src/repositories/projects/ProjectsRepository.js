const db = require('../../configs/databases/postgres/db');

class projectsRepository {
  // Customer Section

  async addProject(data, vendor_id) {
    // const { client_id, vendor_id, name } = data;
    const { client_id, project_name, name, lat, long, type, buildingtype, area, numperson, numroom, numbathroom, numfloor, theme, budget, buildingtime, notes } = data;
    const query1 = {
      text: `
        INSERT INTO projectdetail (name, lat, long, type, buildingtype, area, numperson, numroom, numbathroom, numfloor, theme, budget, buildingtime, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`,
      values: [name, lat, long, type, buildingtype, area, numperson, numroom, numbathroom, numfloor, theme, budget, buildingtime, notes],
    };
    const detail = await db.command(query1);
    const query = {
      text: `
        INSERT INTO projects (client_id, vendor_id, detail_id, status, name)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
      values: [client_id, vendor_id.id, detail.data[0].id, 'Menunggu konfirmasi', project_name],
    };
    const result = await db.command(query);
    const query2 = {
      text: `
        INSERT INTO status_detail (project_id, name, "desc")
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [result.data[0].id, 'Menunggu konfirmasi', 'Menunggu konfirmasi dari vendor'],
    };
    await db.command(query2);
    return result;
  }

  async finishPaymentProject(data) {
    const id = data;
    const query = {
      text: `
        UPDATE projects
        SET status = $1
        WHERE id = $2`,
      values: ['Pengerjaan', id],
    };

    const result = await db.query(query);
    const query2 = {
      text: `
        INSERT INTO status_detail (project_id, name, "desc")
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [id, 'Project telah selesai', 'Project anda telah selesai'],
    };
    await db.command(query2);
    return result;
  }

  async getProjectsByUserId(data, role) {
    const { id } = data;
    console.log(id, role);
    if (role === 'client') {
      var query = {
        text: `
          SELECT 
            projects.id, 
            projects.name, 
            projects.status, 
            projects.client_id, 
            projects.vendor_id, 
            transactions.id as transaction_id, 
            transactions.status as status_transaction, 
            transactions.price, 
            transactions.tax, 
            transactions.amount
          FROM projects 
          LEFT JOIN transactions on projects.transaction_id=transactions.id
          WHERE projects.client_id = $1`,
        values: [id],
      };
    } else {
      var query = {
        text: `
          SELECT 
            projects.id, 
            projects.name, 
            projects.status, 
            projects.client_id, 
            projects.vendor_id, 
            transactions.id as transaction_id, 
            transactions.status as status_transaction, 
            transactions.price, 
            transactions.tax, 
            transactions.amount
          FROM projects 
          LEFT JOIN transactions on projects.transaction_id=transactions.id
          WHERE projects.vendor_id = $1`,
        values: [id],
      };
    }
    const result = await db.query(query);
    console.log(result);
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
    console.log('>>', id);
    const query = {
      text: `
        SELECT 
          projects.id, 
          projects.name, 
          projects.status, 
          projects.client_id, 
          projects.vendor_id, 
          users.profile_name,
          users.profile_picture,
          users.phonenumber,
          users.role,
          transactions.id as transaction_id, 
          transactions.status as status_transaction, 
          transactions.price, 
          transactions.tax, 
          transactions.amount,
          projectdetail.*
        FROM projects 
        LEFT JOIN transactions on projects.transaction_id=transactions.id
        LEFT JOIN projectdetail on projects.detail_id=projectdetail.id
        LEFT JOIN users on projects.vendor_id = users.id
        WHERE projects.id = $1`,
      values: [id],
    };

    const result = await db.query(query);
    console.log(id);
    console.log(result);
    return result;
  }

  async finishProject(data) {
    const id = data;
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

  async addStatusByProjectId(data, id) {
    const { name, desc } = data;
    const query = {
      text: `
        INSERT INTO status_detail (project_id, name, "desc")
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [id.id, name, desc],
    };
    const result = await db.query(query);

    return result;
  }

  async getStatusByProjectId(id) {
    console.log('>>', id.id);
    const query = {
      text: `
        SELECT *
        FROM status_detail
        WHERE project_id = $1`,
      values: [id.id],
    };

    const result = await db.query(query);
    return result;
  }

  // Vendor Section
  async addLampiranByProjectId(data, id) {
    const { name, link, desc } = data;
    console.log('>>', id, name, link, desc);
    const query = {
      text: `
        INSERT INTO lampirans (project_id, name, link, "desc")
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      values: [id.id, name, link, desc],
    };
    const result = await db.query(query);

    return result;
  }

  async getLampiranByProjectId(id) {
    console.log('>>', id.id);
    const query = {
      text: `
        SELECT *
        FROM lampirans
        WHERE project_id = $1`,
      values: [id.id],
    };

    const result = await db.query(query);
    return result;
  }

  async accProject(data) {
    const id = data;
    const query = {
      text: `
        UPDATE projects
        SET status = $1
        WHERE id = $2`,
      values: ['Pembayaran', id],
    };
    const result = await db.query(query);

    const query2 = {
      text: `
        INSERT INTO status_detail (project_id, name, "desc")
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [id, 'Vendor telah mengkonfimasi project', 'Vendor telah mengkonfimasi project, silahkan lanjutkan pembayaran'],
    };
    const updatestatus = await db.command(query2);
    console.log(updatestatus);

    return result;
  }

  async processingProject(data) {
    const id = data;
    const query0 = {
      text: `
        INSERT status_detail (project_id, name, desc)
        VALUES ($1, $2, $3)
        RETURNING id`,
      values: [id, 'Pengerjaan', 'Sedang dalam masa pengerjaan.'],
    };
    await db.query(query0);

    const query = {
      text: `
        UPDATE projects
        SET status = $1
        WHERE id = $2`,
      values: ['Pengerjaan', id],
    };
    const result = await db.query(query);

    const query2 = {
      text: `
        INSERT INTO status_detail (project_id, name, "desc")
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [id, 'Sedang masa pengerjaan', 'Sedang masa pengerjaan, silhakan tunggu beberapa saat'],
    };
    await db.command(query2);

    return result;
  }

  async checkProject(data) {
    const id = data;
    const query0 = {
      text: `
        INSERT status_detail (project_id, name, desc)
        VALUES ($1, $2, $3)
        RETURNING id`,
      values: [id, 'Pengecekan', 'Sedang dalam masa pengecekan.'],
    };
    await db.query(query0);
    const query = {
      text: `
        UPDATE projects
        SET status = $1
        WHERE id = $2`,
      values: ['Pengecekan', id],
    };
    const result = await db.query(query);
    const query2 = {
      text: `
        INSERT INTO status_detail (project_id, name, "desc")
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [id, 'Masa pengecekan ulang', 'Silahkan periksa pekerjaan yang telah dilakukan oleh vendor'],
    };
    await db.command(query2);
    return result;
  }

  async addInfoByProjectId(data, id){
    const { name, value } = data
    console.log(name, value, id.id)

    const query = {
      text: `
        INSERT INTO additionaldetail (project_id, name, "value")
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [id.id, name, value],
    };
    const result = await db.command(query);
    return result;
  }

  async getInfoByProjectId(id){
    console.log(id.id)
    const query = {
      text: `
        SELECT *
        FROM additionaldetail
        WHERE project_id = $1`,
      values: [id.id],
    };

    const result = await db.query(query);
    return result;
  }

  async updateInfoById(data, id){
    const { name, value } = data
    console.log(name, value, id.id)

    const query = {
      text: `
        UPDATE additionaldetail
        SET name = $2, "value" = $3
        WHERE id = $1
        RETURNING *`,
      values: [id.id, name, value],
    };
    
    const result = await db.command(query);
    return result;
  }

  async deleteInfoById(id) {
    const query = {
      text: `
        DELETE FROM additionaldetail
        WHERE id = $1
        RETURNING *`,
      values: [id.id],
    };
    
    const result = await db.command(query);
    return result;
}
  
}

module.exports = projectsRepository;
