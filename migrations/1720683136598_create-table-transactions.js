/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('transactions', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    status: {
      type: 'varchar(100)',
      notNull: true,
    },
    price: {
      type: 'decimal(12,2)',
      notNull: true,
    },
    tax: {
      type: 'decimal(12,2)',
      notNull: true,
    },
    amount: {
      type: 'decimal(12,2)',
      notNull: true,
    },
    payment_method: {
      type: 'uuid',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('transactions', 'fk_payment_id', 'FOREIGN KEY(payment_method) REFERENCES payments(id) ON DELETE SET NULL');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('transactions');
};
