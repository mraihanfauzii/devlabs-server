/* eslint-disable max-len */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('portofolio_clicks', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    portofolio_id: {
      type: 'uuid',
    },
    user_id: {
      type: 'uuid',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('portofolio_clicks', 'portofolio_clicks_portofolio_id_fkey', 'FOREIGN KEY(portofolio_id) REFERENCES portofolios(id) ON DELETE CASCADE');
  pgm.addConstraint('portofolio_clicks', 'portofolio_clicks_user_id_fkey', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('portofolio_clicks', 'portofolio_clicks_portofolio_id_user_id_unique', 'UNIQUE(portofolio_id, user_id)');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('portofolio_clicks', 'portofolio_clicks_portofolio_id_fkey');
  pgm.dropConstraint('portofolio_clicks', 'portofolio_clicks_user_id_fkey');
  pgm.dropConstraint('portofolio_clicks', 'portofolio_clicks_portofolio_id_user_id_unique');
  pgm.dropTable('portofolio_clicks');
};
