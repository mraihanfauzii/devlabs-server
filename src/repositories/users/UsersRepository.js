const db = require('../../configs/databases/postgres/db');
const { hashPassword } = require('../../utils/hashPassword');

class UsersRepository {
  async registerUser(data) {
    const { email, password, profile_name, phonenumber, role } = data;

    const hashedPassword = await hashPassword(password, 10);

    const query = {
      text: `
        INSERT INTO users (email, password, profile_name, phonenumber, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
      values: [email, hashedPassword, profile_name, phonenumber, role],
    };

    const result = await db.command(query);

    return result;
  }

  async getUserByEmailAndRole(data) {
    const { email, role } = data;

    const query = {
      text: 'SELECT * FROM users WHERE email = $1 AND role = $2 LIMIT 1',
      values: [email, role],
    };

    const result = await db.query(query);
    return result;
  }

  async getUserByEmail(data) {
    const { email } = data;

    const query = {
      text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
      values: [email],
    };

    const result = await db.query(query);
    return result;
  }

  async getAllUsers(data) {
    const { role } = data;
    const query = {
      text: `
        SELECT *
        FROM users
        ${role ? 'WHERE role = $1' : ''}`,
      values: role ? [role] : [],
    };

    const result = await db.query(query);
    return result;
  }

  async getUserById(data) {
    const { id } = data;

    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await db.query(query);
    return result;
  }

  async updateUserProfile(data) {
    const { id, profile_name, profile_picture, profile_description, phonenumber, city, rate } = data;

    const query = {
      text: `
        UPDATE users
        SET profile_name = $1, profile_picture = $2, profile_description = $3, phonenumber = $4, city = $5, rate = $6
        WHERE id = $7
        RETURNING id`,
      values: [profile_name, profile_picture, profile_description, phonenumber, city, rate, id],
    };

    const result = await db.command(query);
    return result;
  }
}

module.exports = UsersRepository;
