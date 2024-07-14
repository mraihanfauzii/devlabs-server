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
  pgm.createTable('banks', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    accname: {
      type: 'varchar(100)',
      notNull: true,
    },
    accnumber: {
      type: 'varchar(100)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.sql(`
    INSERT INTO banks (id, name, accName, accNumber) VALUES
      ('6bccf43e-b413-42e8-86f4-f9312566466c', 'BCA', 'PT Devlab', '1234567890'),
      ('a0b6dea6-9610-42a1-8b1f-2ffce7566f6d', 'BNI', 'PT Devlab', '0987654321'),
      ('cb9d62ae-1dbb-4422-ad04-812f80771f8b', 'Mandiri', 'PT Devlab', '3525325325'),
      ('80376bf5-f806-4df5-8acd-9e353624ad48', 'BSI', 'PT Devlab', '032552167'),
      ('3a3f6156-6d5b-45b2-9b2e-e5e8f472b6a4', 'VA BNI', 'PT Devlab', '00110987654321'),
      ('7f1d4b7f-8706-4e1f-a50b-9f0e54b98d0c', 'VA Mandiri', 'PT Devlab', '00113525325325'),
      ('b365e9e1-9a6b-4a62-92b8-8a1a52f9ae7f', 'VA BSI', 'PT Devlab', '0011032552167')
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('banks');
};
