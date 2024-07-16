const db = require('../../configs/databases/postgres/db');

class MessagesRepository {
  async createMessage(data) {
    const { sender_id, receiver_id, message } = data;

    const query = {
      text: `
      INSERT INTO messages(sender_id, receiver_id, message)
      VALUES($1, $2, $3)
      RETURNING id`,
      values: [sender_id, receiver_id, message],
    };

    const result = await db.command(query);
    return result;
  }

  async getMessagesBetweenUsers(data) {
    const { first_user_id, second_user_id } = data;

    const query = {
      text: `
        SELECT
          m.id,
          m.sender_id,
          u1.profile_name AS sender_profile_name,
          u1.profile_picture AS sender_profile_picture,
          m.receiver_id,
          u2.profile_name AS receiver_profile_name,
          u2.profile_picture AS receiver_profile_picture,
          m.message,
          m.created_at
        FROM messages m
        LEFT JOIN users u1 ON m.sender_id = u1.id
        LEFT JOIN users u2 ON m.receiver_id = u2.id
        WHERE (sender_id = $1 AND receiver_id = $2)
          OR (sender_id = $2 AND receiver_id = $1)
        ORDER BY created_at`,
      values: [first_user_id, second_user_id],
    };

    const result = await db.query(query);
    return result;
  }
}

module.exports = MessagesRepository;
