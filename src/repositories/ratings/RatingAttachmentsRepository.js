const db = require('../../configs/databases/postgres/db');

class RatingAttachmentsRepository {
  async createRatingAttachment(data) {
    const { rating_id, name, path } = data;

    const query = {
      text: `
        INSERT INTO rating_attachments (rating_id, name, path)
        VALUES ($1, $2, $3)
        RETURNING id`,
      values: [rating_id, name, path],
    };

    const result = await db.command(query);
    return result;
  }

  async getRatingAttachmentsByRatingId(data) {
    const { rating_id } = data;

    const query = {
      text: `
        SELECT * FROM rating_attachments
        WHERE rating_id = $1`,
      values: [rating_id],
    };

    const result = await db.query(query);
    return result;
  }
}

module.exports = RatingAttachmentsRepository;
