/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('ratings', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    rater_id: {
      type: 'uuid',
      notNull: true,
    },
    ratee_id: {
      type: 'uuid',
      notNull: true,
    },
    rating: {
      type: 'smallint',
      check: 'rating >= 1 AND rating <= 5',
      notNull: true,
    },
    description: {
      type: 'text',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('ratings', 'fk_rater_id', 'FOREIGN KEY(rater_id) REFERENCES users(id)');
  pgm.addConstraint('ratings', 'fk_ratee_id', 'FOREIGN KEY(ratee_id) REFERENCES users(id)');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('ratings');
};
