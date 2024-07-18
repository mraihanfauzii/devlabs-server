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
  pgm.createTable('promos', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    img: {
      type: 'text',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.sql(`
        INSERT INTO promos (name, img) VALUES
        ('Diskon desember', 'https://assets.digination.id/crop/0x0:0x0/x/photo/2020/12/02/1293541956.png'),
        ('Diskon januari', 'https://www.shutterstock.com/image-vector/colorful-discount-sale-podium-special-600nw-2055955985.jpg'),
        ('Diskon februari', 'https://www.shutterstock.com/image-vector/flash-sale-promotion-banner-25-600nw-2159885029.jpg'),
        ('Diskon maret', 'https://st2.depositphotos.com/6623886/10890/v/950/depositphotos_108909362-stock-illustration-super-sale-banner-design-you.jpg'),
        ('Diskon april', 'https://www.shutterstock.com/image-vector/sale-banner-template-design-600nw-2159885027.jpg'),
        ('Diskon mei', 'https://www.shutterstock.com/image-vector/sale-banner-template-design-600nw-2159885027.jpg'),
        ('Diskon juni', 'https://www.shutterstock.com/image-vector/sale-banner-template-design-600nw-2159885027.jpg'),
        ('Diskon juli', 'https://www.shutterstock.com/image-vector/sale-banner-template-design-600nw-2159885027.jpg'),
        ('Diskon agustus', 'https://www.shutterstock.com/image-vector/sale-banner-template-design-600nw-2159885027.jpg'),
        ('Diskon september', 'https://www.shutterstock.com/image-vector/sale-banner-template-design-600nw-2159885027.jpg'),
        ('Diskon oktober', 'https://www.shutterstock.com/image-vector/sale-banner-template-design-600nw-2159885027.jpg'),
        ('Diskon november', 'https://www.shutterstock.com/image-vector/sale-banner-template-design-600nw-2159885027.jpg');
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('promos');
};
