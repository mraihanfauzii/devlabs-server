/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('projects', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    client_id: {
      type: 'uuid',
    },
    vendor_id: {
      type: 'uuid',
    },
    status: {
      type: 'varchar(100)',
      notNull: true,
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('projects', 'fk_client', 'FOREIGN KEY(client_id) REFERENCES users(id) ON DELETE SET NULL');
  pgm.addConstraint('projects', 'fk_vendor', 'FOREIGN KEY(vendor_id) REFERENCES users(id) ON DELETE SET NULL');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('projects');
};
