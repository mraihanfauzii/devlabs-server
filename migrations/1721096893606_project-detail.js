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
  pgm.createTable('projectdetail', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    lat: {
      type: 'varchar(100)',
      notNull: true,
    },
    long: {
      type: 'varchar(100)',
      notNull: true,
    },
    type: {
      type: 'varchar(100)',
      notNull: true,
    },
    buildingtype: {
      type: 'varchar(100)',
      notNull: true,
    },
    area: {
      type: 'decimal(10)',
      notNull: true,
    },
    numperson: {
      type: 'decimal(10)',
      notNull: true,
    },
    numroom: {
      type: 'decimal(10)',
      notNull: true,
    },
    numbathroom: {
      type: 'decimal(10)',
      notNull: true,
    },
    numfloor: {
      type: 'decimal(10)',
      notNull: true,
    },
    theme: {
      type: 'varchar(100)',
      notNull: true,
    },
    budget: {
      type: 'varchar(100)',
      notNull: true,
    },
    buildingtime: {
      type: 'timestamp'
    },
    notes: {
      type: 'varchar(250)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('projectdetail');
};
