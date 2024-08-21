// src/configs/db.js
const { Pool } = require('pg');
const logger = require('../../../utils/logger');
const dataWrapper = require('../../../utils/dataWrapper');

class DB {
  constructor() {
    this.pool = new Pool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || 'db_devlabs',
    });

    this.pool.on('error', (err) => {
      logger.error('Unexpected error on idle client', err);
    });

    this.pool.on('connect', () => {
      logger.info('Postgres database connected');
    });

    if (process.env.ENV !== 'test') {
      this.initialConnect();
    }
  }

  async initialConnect(retryTimeout = 5000) {
    const maxRetries = 10;
    let attempts = 0;
    while (attempts < maxRetries) {
      let client;
      try {
        client = await this.pool.connect();
        logger.info('Initial database connection successful');
        return;
      } catch (err) {
        attempts += 1;
        logger.error(`Initial database connection error (attempt ${attempts}):`, err);
        if (attempts < maxRetries) {
          logger.info(`Retrying database connection (attempt ${attempts + 1})...`);
          await new Promise((resolve) => { setTimeout(resolve, retryTimeout); });
        } else {
          logger.info('Continuing to run server without database connection');
        }
      } finally {
        if (client) {
          client.release();
        }
      }
    }
  }

  async query(statement, values) {
    let client;
    try {
      client = await this.pool.connect();
      const res = await client.query(statement, values);
      if (!res.rows || res.rowCount === 0) {
        return dataWrapper.error('No data returned from query');
      }
      return dataWrapper.data(res.rows);
    } catch (err) {
      logger.error('Database query error:', err);
      return dataWrapper.error(err.message);
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async command(statement, values) {
    let client;
    try {
      client = await this.pool.connect();
      await client.query('BEGIN');
      const res = await client.query(statement, values);
      await client.query('COMMIT');
      if (!res.rows || res.rowCount === 0) {
        return dataWrapper.error('No data returned from query');
      }
      return dataWrapper.data(res.rows);
    } catch (err) {
      if (client) {
        await client.query('ROLLBACK');
      }
      logger.error('Database query error:', err);
      return dataWrapper.error(err.message);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

module.exports = new DB();
