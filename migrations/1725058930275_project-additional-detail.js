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
    pgm.createTable('additionaldetail', {
        id: {
          type: 'uuid',
          primaryKey: true,
          default: pgm.func('uuid_generate_v4()'),
        },
        project_id: {
            type: 'uuid',
        },
        name: {
          type: 'varchar(100)',
          notNull: true,
        },
        value: {
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
exports.down = (pgm) => {
    pgm.dropTable('additionaldetail');
};
