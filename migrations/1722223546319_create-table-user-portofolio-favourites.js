/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('user_portofolio_favourites', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    user_id: {
      type: 'uuid',
      notNull: true,
    },
    portofolio_id: {
      type: 'uuid',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('user_portofolio_favourites', 'user_portofolio_favourites_user_id_portofolio_id_unique',
    'UNIQUE(user_id, portofolio_id)');
  pgm.addConstraint('user_portofolio_favourites', 'user_portofolio_favourites_user_id_fkey',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('user_portofolio_favourites', 'user_portofolio_favourites_portofolio_id_fkey',
    'FOREIGN KEY(portofolio_id) REFERENCES portofolios(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('user_portofolio_favourites');
};
