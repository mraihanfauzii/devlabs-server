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
    pgm.addColumns('projects', {
       info_id: {
          type: 'uuid',
        },
      });
      pgm.addConstraint('projects', 'fk_info', 'FOREIGN KEY(info_id) REFERENCES additionaldetail(id) ON DELETE SET NULL');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('projects', 'fk_info');
    pgm.dropColumns('projects', 'info_id');
};
