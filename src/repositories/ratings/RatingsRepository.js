const db = require('../../configs/databases/postgres/db');

class RatingsRepository {
  async createRating(data) {
    const {
      rater_id,
      ratee_id,
      rating,
      description,
    } = data;

    const query = {
      text: `
        INSERT INTO ratings (rater_id, ratee_id, rating, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
      values: [rater_id, ratee_id, rating, description],
    };

    const result = await db.command(query);
    return result;
  }

  async getRatingsByRateeId(data) {
    const { ratee_id } = data;

    const query = {
      text: `
        SELECT
          r.id,
          r.rater_id,
          u.profile_name AS rater_profile_name,
          u.profile_picture AS rater_profile_picture,
          r.ratee_id,
          u2.profile_name AS ratee_profile_name,
          u2.profile_picture AS ratee_profile_picture,
          r.rating,
          r.description,
          r.created_at
        FROM ratings r
        LEFT JOIN users u ON r.rater_id = u.id
        LEFT JOIN users u2 ON r.ratee_id = u2.id
        WHERE r.ratee_id = $1`,
      values: [ratee_id],
    };

    const result = await db.query(query);
    return result;
  }

  async getRatingsByRaterId(data) {
    const { rater_id } = data;

    const query = {
      text: `
        SELECT
          r.id,
          r.rater_id,
          u.profile_name AS rater_profile_name,
          u.profile_picture AS rater_profile_picture,
          r.ratee_id,
          u2.profile_name AS ratee_profile_name,
          u2.profile_picture AS ratee_profile_picture,
          r.rating,
          r.description,
          r.created_at
        FROM ratings r
        LEFT JOIN users u ON r.rater_id = u.id
        LEFT JOIN users u2 ON r.ratee_id = u2.id
        WHERE r.rater_id = $1`,
      values: [rater_id],
    };

    const result = await db.query(query);
    return result;
  }

  async getRatingById(data) {
    const { id } = data;

    const query = {
      text: `
        SELECT
          r.id,
          r.rater_id,
          u.profile_name AS rater_profile_name,
          u.profile_picture AS rater_profile_picture,
          r.ratee_id,
          u2.profile_name AS ratee_profile_name,
          u2.profile_picture AS ratee_profile_picture,
          r.rating,
          r.description,
          r.created_at
        FROM ratings r
        LEFT JOIN users u ON r.rater_id = u.id
        LEFT JOIN users u2 ON r.ratee_id = u2.id
        WHERE r.id = $1`,
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }

  async getRateeAverageRating(data) {
    const { ratee_id } = data;

    const query = {
      text: `
        SELECT
          ROUND(AVG(rating), 1) AS average_rating
        FROM ratings
        WHERE ratee_id = $1`,
      values: [ratee_id],
    };

    const result = await db.query(query);
    return result;
  }
}

module.exports = RatingsRepository;
