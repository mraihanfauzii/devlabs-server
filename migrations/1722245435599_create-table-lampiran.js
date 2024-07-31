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
    pgm.createTable('lampirans', {
        id: {
          type: 'uuid',
          primaryKey: true,
          default: pgm.func('uuid_generate_v4()'),
        },
        project_id: {
            type: 'uuid'
          },
        name: {
          type: 'varchar(100)',
          notNull: true,
        },
        link: {
          type: 'varchar(255)',
          notNull: true,
        },
        desc: {
          type: 'varchar(255)',
          notNull: true,
        },
        created_at: {
          type: 'timestamp',
          default: pgm.func('current_timestamp'),
        },
      });
      pgm.addConstraint('lampirans', 'fk_projects', 'FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE SET NULL');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('lampirans', 'fk_projects');
    pgm.dropTable('lampirans');
};
