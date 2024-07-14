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
  pgm.createTable('payments', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    type: {
      type: 'varchar(100)',
      notNull: true,
    },
    banks: {
      type: 'uuid',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.addConstraint('payments', 'fk_banks_id', 'FOREIGN KEY(banks) REFERENCES banks(id) ON DELETE SET NULL');
  pgm.sql(`
    INSERT INTO payments (type, banks) VALUES
      ('Bank Transfer', '6bccf43e-b413-42e8-86f4-f9312566466c'),
      ('Bank Transfer', 'a0b6dea6-9610-42a1-8b1f-2ffce7566f6d'),
      ('Bank Transfer', 'cb9d62ae-1dbb-4422-ad04-812f80771f8b'),
      ('Bank Transfer', '80376bf5-f806-4df5-8acd-9e353624ad48'),
      ('Virtual Account', '3a3f6156-6d5b-45b2-9b2e-e5e8f472b6a4'),
      ('Virtual Account', '7f1d4b7f-8706-4e1f-a50b-9f0e54b98d0c'),
      ('Virtual Account', 'b365e9e1-9a6b-4a62-92b8-8a1a52f9ae7f')
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('payments');
};
