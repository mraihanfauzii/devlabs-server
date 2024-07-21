/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('theme_clicks', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    theme_id: {
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

  pgm.addConstraint('theme_clicks', 'theme_clicks_theme_id_fkey', 'FOREIGN KEY(theme_id) REFERENCES themes(id) ON DELETE CASCADE');
  pgm.addConstraint('theme_clicks', 'theme_clicks_user_id_fkey', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('theme_clicks', 'theme_clicks_theme_id_user_id_unique', 'UNIQUE(theme_id, user_id)');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('theme_clicks', 'theme_clicks_theme_id_fkey');
  pgm.dropConstraint('theme_clicks', 'theme_clicks_user_id_fkey');
  pgm.dropConstraint('theme_clicks', 'theme_clicks_theme_id_user_id_unique');
  pgm.dropTable('theme_clicks');
};
