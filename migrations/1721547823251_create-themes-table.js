/* eslint-disable max-len */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('themes', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    theme_image: {
      type: 'text',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.sql(`
    INSERT INTO themes (name, theme_image) VALUES
    ('Modern', 'https://t3.ftcdn.net/jpg/06/95/69/32/360_F_695693234_NvecFhB7RAem2ciwSi97jSxrNqILCcrs.jpg'),
    ('Asian', 'https://i.pinimg.com/736x/c6/da/08/c6da085d32580fd78185538a4b52e8d0.jpg'),
    ('Tropical', 'https://media.istockphoto.com/id/170025652/photo/beautiful-new-upscale-home.jpg?s=612x612&w=0&k=20&c=XjC_mk_7Yfo9cWnWrwwXzCdXk9loHZTttETB7xcPrhQ='),
    ('Traditional', 'https://media.istockphoto.com/id/1352953114/photo/joglo-house.jpg?s=612x612&w=0&k=20&c=lTCGb3VayS6KCD41PEecGbNlF7mOo3s4gHJnROJDasA='),
    ('Contemporary', 'https://media.istockphoto.com/id/876864896/photo/luxurious-new-construction-home-in-bellevue-wa.jpg?s=612x612&w=0&k=20&c=Y5ZhzHSiyku1N4QGIF5FP4TkVhvEzTkEGSQ4FwZ7nlA='),
    ('Victorian', 'https://t3.ftcdn.net/jpg/02/14/16/84/360_F_214168419_Bo5h6t1I6vv5E4EBUX6hIlZ1Z2ExR60S.jpg'),
    ('Industrial', 'https://static.vecteezy.com/system/resources/previews/028/112/658/non_2x/unique-industrial-architecture-house-in-daylight-realistic-ai-generative-free-photo.jpg'),
    ('Rustic', 'https://media.istockphoto.com/id/471826199/photo/french-brittany-typical-house.jpg?s=612x612&w=0&k=20&c=Izy6Ms8WytO21jJ2gtuUlylIDl38TMgZYcFZTncFAcM='),
    ('Minimalist', 'https://images.pexels.com/photos/8134820/pexels-photo-8134820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('themes');
};
