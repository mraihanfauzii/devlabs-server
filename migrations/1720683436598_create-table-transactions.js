/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('transactions', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    project_id: {
      type: 'uuid',
    },
    status: {
      type: 'varchar(100)',
      notNull: true,
    },
    payment_method: {
      type: 'varchar(100)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('transactions', 'fk_project_id', 'FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE SET NULL');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('transactions');
};
