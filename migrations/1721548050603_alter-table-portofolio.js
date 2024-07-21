/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.addColumns('portofolios', {
    theme_id: {
      type: 'uuid',
    },
    estimated_budget: {
      type: 'integer',
    },
  });

  pgm.addConstraint('portofolios', 'fk_portofolios_theme_id', 'FOREIGN KEY(theme_id) REFERENCES themes(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('portofolios', 'fk_portofolios_theme_id');
  pgm.dropColumns('portofolios', ['theme_id', 'estimated_budget']);
};
