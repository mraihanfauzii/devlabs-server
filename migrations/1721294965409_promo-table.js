/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    gm.createTable('banks', {
        id: {
          type: 'uuid',
          primaryKey: true,
          default: pgm.func('uuid_generate_v4()'),
        },
        name: {
          type: 'varchar(100)',
          notNull: true,
        },
        img: {
          type: 'varchar(100)',
          notNull: true,
        },
        created_at: {
          type: 'timestamp',
          default: pgm.func('current_timestamp'),
        },
      });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
