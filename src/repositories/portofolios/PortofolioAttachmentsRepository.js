const db = require('../../configs/databases/postgres/db');

class PortofolioAttachmentsRepository {
  async createPortofolioAttachment(data) {
    const { portofolio_id, name, path } = data;

    const query = {
      text: `
        INSERT INTO portofolio_attachments (portofolio_id, name, path)
        VALUES ($1, $2, $3)
        RETURNING id`,
      values: [portofolio_id, name, path],
    };

    const result = await db.command(query);
    return result;
  }

  async getPortofolioAttachmentsByPortofolioId(data) {
    const { portofolio_id } = data;

    const query = {
      text: `
        SELECT * FROM portofolio_attachments
        WHERE portofolio_id = $1`,
      values: [portofolio_id],
    };

    const result = await db.query(query);
    return result;
  }

  async deletePortofolioAttachmentById(data) {
    const { id } = data;

    const query = {
      text: `
        DELETE FROM portofolio_attachments
        WHERE id = $1`,
      values: [id],
    };

    const result = await db.command(query);
    return result;
  }
}

module.exports = PortofolioAttachmentsRepository;
