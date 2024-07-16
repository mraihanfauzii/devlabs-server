/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('messages', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    sender_id: {
      type: 'uuid',
    },
    receiver_id: {
      type: 'uuid',
    },
    message: {
      type: 'text',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('messages', 'fk_sender_id', 'FOREIGN KEY(sender_id) REFERENCES users(id) ON DELETE SET NULL');
  pgm.addConstraint('messages', 'fk_receiver_id', 'FOREIGN KEY(receiver_id) REFERENCES users(id) ON DELETE SET NULL');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('messages');
};
