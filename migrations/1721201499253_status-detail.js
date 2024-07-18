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
  pgm.createTable('status_detail', {
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
    desc: {
      type: 'varchar(250)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    }
  });
  pgm.addConstraint('status_detail', 'fk_projects', 'FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE SET NULL');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('status_detail', 'fk_projects');
  pgm.dropTable('status_detail');
};
