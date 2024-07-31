/* eslint-disable max-len */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(`
    INSERT INTO users (id, email, password, phonenumber, profile_name, profile_description, role)
    VALUES
    ('7d492cd4-0c82-45f9-a72c-539d8d553b42', 'john.doe@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567890', 'John Doe', 'An experienced architect specializing in modern designs.', 'architect'),
    ('c5d4c4c9-2c4c-4c4c-9c4c-4c4c4c4c4c4c', 'jane.smith@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567891', 'Jane Smith', 'A passionate client looking to build a dream home.', 'client'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c', 'alex.johnson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567892', 'Alex Johnson', 'Architect with a focus on sustainable and eco-friendly designs.', 'architect'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4d', 'emily.brown@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567893', 'Emily Brown', 'Client looking for a modern and spacious home.', 'client'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 'michael.williams@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567894', 'Michael Williams', 'Architect specializing in minimalist and functional designs.', 'architect'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'sarah.jones@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567895', 'Sarah Jones', 'Client looking for a cozy and inviting home.', 'client'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c5f', 'david.miller@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567896', 'David Miller', 'Architect with a passion for sustainable and energy-efficient designs.', 'architect'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f', 'laura.davis@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567897', 'Laura Davis', 'Client looking for a traditional and elegant home.', 'client'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 'chris.moore@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567898', 'Chris Moore', 'Architect specializing in contemporary and innovative designs.', 'architect'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f', 'olivia.taylor@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567899', 'Olivia Taylor', 'Client looking for a unique and artistic home.', 'client');
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
      '7d492cd4-0c82-45f9-a72c-539d8d553b42',
      'c5d4c4c9-2c4c-4c4c-9c4c-4c4c4c4c4c4c',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4d',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c5f',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f'
    );
  `);
};
