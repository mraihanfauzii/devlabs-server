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
    pgm.sql(`
        INSERT INTO users (id, email, password, phonenumber, profile_name, profile_description, role)
        VALUES
        ('7d492cd4-0c82-55f9-a72c-539d8d553b42', 'build.matic@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567890', 'BuildMatic', 'BuildMatic menjadi pilihan utama untuk proyek pembangunan skala besar maupun kecil.', 'contractor'),
        ('c5d4c4c9-2c4c-5c4c-9c4c-4c4c4c4c4c4c', 'craft.master@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567891', 'CraftMaster Construction', 'Kualitas kerajinan tangan dan memastikan setiap proyek mencerminkan visi unik klien mereka.', 'contractor'),
        ('f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c4c', 'pro.core@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567892', 'ProCore Builders', 'Memastikan bahwa setiap proyek diselesaikan dengan standar tertinggi dalam industri.', 'contractor'),
        ('f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c4d', 'urban.crest@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567893', 'UrbanCrest Contractors', 'Menciptakan ruang yang modern dan fungsional yang sesuai dengan dinamika kota yang terus berkembang.', 'contractor'),
        ('f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c4e', 'steel.works@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567894', 'SteelWorks Construction', 'Kontraktor yang ahli dalam proyek-proyek yang membutuhkan struktur baja.', 'contractor'),
        ('f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c4f', 'ever.green@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567895', 'Evergreen Builders', 'Konstruksi yang berkomitmen pada pembangunan berkelanjutan.', 'contractor'),
        ('f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c5f', 'prime.struct@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567896', 'PrimeStruct Constructions', 'Menangani proyek residensial dan komersial dengan pendekatan yang disesuaikan untuk memenuhi kebutuhan klien yang paling menuntut.', 'contractor'),
        ('f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c6f', 'blue.stone@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567897', 'BlueStone Contractors', 'Menangani proyek infrastruktur besar, seperti jembatan, jalan raya, dan fasilitas publik.', 'contractor'),
        ('f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c7f', 'peak.build@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567898', 'PeakBuild Solutions', 'Solusi inovatif untuk memastikan setiap proyek berjalan lancar dari awal hingga akhir, menjadikan mitra ideal untuk proyek-proyek dengan tuntutan tinggi.', 'contractor'),
        ('f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c8f', 'solid.base@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567899', 'SolidBase Construction', 'Diandalkan untuk memastikan setiap proyek memiliki dasar yang kokoh, memastikan umur panjang dan stabilitas bangunan.', 'contractor');
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
    DELETE FROM users
    WHERE id IN (
      '7d492cd4-0c82-55f9-a72c-539d8d553b42',
      'c5d4c4c9-2c4c-5c4c-9c4c-4c4c4c4c4c4c',
      'f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c4c',
      'f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c4d',
      'f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c4e',
      'f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c4f',
      'f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c5f',
      'f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c6f',
      'f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c7f',
      'f4c4c4c4-4c4c-5c4c-4c4c-4c4c4c4c4c8f'
    );
  `);
};
