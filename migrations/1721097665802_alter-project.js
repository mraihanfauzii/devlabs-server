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
        detail_id: {
            type: 'uuid'
        },
    });
    pgm.addConstraint('projects', 'fk_detail', 'FOREIGN KEY(detail_id) REFERENCES projectdetail(id) ON DELETE SET NULL');
    pgm.dropColumns('projects', 'notes')
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('projects', 'fk_detail');
    pgm.dropColumns('projects', 'detail_id');
    pgm.addColumns('projects', {
        notes: {
            type: 'text',
            notNull: true,
        }
    });
};