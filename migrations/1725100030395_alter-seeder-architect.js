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
    INSERT INTO users (id, email, password, phonenumber, profile_name, profile_description, role, city, rate)
    VALUES
    ('1d831d2a-4b68-431b-ae76-ddecd85e967e', 'lucas.martinez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567840', 'Lucas Martinez', 'Architect with a focus on futuristic designs.', 'architect', 'Bandung', 890000),
    ('2a94a1bb-705c-4825-9a4e-cf4e67bfc718', 'amelia.rodriguez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567842', 'Amelia Rodriguez', 'Architect specialized in cultural and heritage buildings.', 'architect', 'Jakarta', 1050000),
    ('3f3ab6e0-d4ad-45e4-8759-f9c9e12b0077', 'elijah.smith@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567844', 'Elijah Smith', 'Architect focused on luxury residential design.', 'architect', 'Surabaya', 1130000),
    ('4f63b1a1-6e74-40ed-9fb3-88ec14f69c5f', 'evelyn.johnson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567846', 'Evelyn Johnson', 'Architect with expertise in industrial architecture.', 'architect', 'Bandung', 920000),
    ('5fda48d4-15f5-4c5a-b7d6-52b4c82c7e1a', 'henry.moore@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567848', 'Henry Moore', 'Architect specializing in urban redevelopment projects.', 'architect', 'Jakarta', 870000),
    ('65c4d85f-c16e-4db1-80c5-3ff53a9c7e2d', 'ava.taylor@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567850', 'Ava Taylor', 'Architect with a passion for landscape architecture.', 'architect', 'Surabaya', 750000),
    ('7a4a142b-2640-48c0-a7b0-82a44b6958b9', 'alex.sanchez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567852', 'Alex Sanchez', 'Architect focused on mixed-use developments.', 'architect', 'Bandung', 1170000),
    ('8a5c3219-9371-47ec-9614-b172e2e1e074', 'mia.morris@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567854', 'Mia Morris', 'Architect with expertise in sustainable design.', 'architect', 'Jakarta', 990000),
    ('9d52cce8-25af-46b4-8fa2-511bc6d22662', 'noah.lee@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567856', 'Noah Lee', 'Architect specialized in healthcare facilities.', 'architect', 'Surabaya', 1070000),
    ('a08c3647-41d3-4b6c-8915-499446b0ac69', 'sophia.clark@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567858', 'Sophia Clark', 'Architect focusing on innovative school designs.', 'architect', 'Bandung', 850000),
    ('b81e0d59-c0db-486b-9346-1e84c635da65', 'william.davis@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567860', 'William Davis', 'Architect passionate about urban sustainability.', 'architect', 'Jakarta', 1110000),
    ('c3e88bb7-9a7e-4f77-a4c2-fbc9cc8bb9e3', 'amelia.hall@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567862', 'Amelia Hall', 'Architect specializing in smart city projects.', 'architect', 'Surabaya', 880000),
    ('d5c4a38b-f53a-4a39-871b-2925d85f99f0', 'james.white@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567864', 'James White', 'Architect with a focus on modern office spaces.', 'architect', 'Bandung', 970000),
    ('e9722e21-4b4f-4bde-9155-c13a69b1494d', 'isabella.thomas@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567866', 'Isabella Thomas', 'Architect specialized in sustainable housing.', 'architect', 'Jakarta', 1010000),
    ('fc8b68a7-605c-4aeb-a38c-4f7074c9d8ae', 'lucas.jackson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567868', 'Lucas Jackson', 'Architect passionate about integrating technology in design.', 'architect', 'Surabaya', 1180000),
    ('05dd2e84-16e0-44f4-8b9d-f18f8d2a5694', 'emma.miller@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567870', 'Emma Miller', 'Architect specializing in adaptive reuse projects.', 'architect', 'Bandung', 1090000),
    ('162e77e2-7b6f-4887-9450-54b9b1a64674', 'logan.anderson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567872', 'Logan Anderson', 'Architect specializing in high-tech architecture.', 'architect', 'Jakarta', 1120000),
    ('287d7a8f-97b5-47eb-bc3c-6b2a86a5d162', 'sofia.hernandez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567874', 'Sofia Hernandez', 'Architect focusing on urban agriculture.', 'architect', 'Surabaya', 1030000),
    ('3a46ff3a-c238-4bc5-b2d4-0ed84bb8c39f', 'oliver.perez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567876', 'Oliver Perez', 'Architect specializing in modular design.', 'architect', 'Bandung', 760000),
    ('4c86c919-cf93-4386-a1d5-45b0a65b4e4e', 'mason.roberts@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567878', 'Mason Roberts', 'Architect with expertise in coastal architecture.', 'architect', 'Jakarta', 1250000),
    ('51e7b7f7-b6e1-4a30-bfae-dc567019dd3d', 'emily.wilson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567880', 'Emily Wilson', 'Architect focusing on eco-friendly office designs.', 'architect', 'Surabaya', 810000),
    ('6e21b614-2b91-4c17-9636-f9a7719230f0', 'olivia.carter@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567882', 'Olivia Carter', 'Architect with a focus on urban infill projects.', 'architect', 'Bandung', 940000),
    ('707b2ecb-d5d8-4e17-abc4-8f5b7843d097', 'liam.evans@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567884', 'Liam Evans', 'Architect specializing in residential interior design.', 'architect', 'Jakarta', 1010000),
    ('84a7b18d-846b-40d7-bab9-cb7455beaad0', 'sophia.turner@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567886', 'Sophia Turner', 'Architect focusing on community-based design.', 'architect', 'Surabaya', 870000),
    ('9d50f10f-fd6f-49d0-ace8-f59746e87454', 'logan.ward@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567888', 'Logan Ward', 'Architect with expertise in hospitality design.', 'architect', 'Bandung', 1190000),
    ('a12b2b0b-0b3f-4de7-b3e0-c89f4bb1a56b', 'emma.cooper@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567890', 'Emma Cooper', 'Architect specializing in urban planning.', 'architect', 'Jakarta', 950000),
    ('bc9f6d5d-5a8d-474b-b573-c3ac2c46f2f5', 'james.kelly@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567892', 'James Kelly', 'Architect with a focus on sustainable materials.', 'architect', 'Surabaya', 1030000),
    ('cb9461f3-bf21-44c7-bc92-e9f0db109920', 'sophia.anderson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567894', 'Sophia Anderson', 'Architect specializing in prefab architecture.', 'architect', 'Bandung', 770000),
    ('d87a2c85-8470-4db5-917e-c77c617ec80e', 'oliver.harris@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567896', 'Oliver Harris', 'Architect with expertise in urban housing.', 'architect', 'Jakarta', 1110000),
    ('e6b0f1f0-d76e-41da-aed4-e3c789d947e6', 'mia.jackson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567898', 'Mia Jackson', 'Architect specializing in museum design.', 'architect', 'Surabaya', 890000),
    ('f7b8b29f-2fd8-4c71-88bb-2e84e38f41f7', 'liam.jones@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567800', 'Liam Jones', 'Architect with a focus on urban mobility.', 'architect', 'Bandung', 1220000),
    ('0e79e5e4-682d-4717-97e6-cf029a15683a', 'olivia.garcia@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567802', 'Olivia Garcia', 'Architect focusing on sustainable infrastructure.', 'architect', 'Jakarta', 950000),
    ('1e25c4a9-7c22-4a7e-a3b6-169bf33760a2', 'noah.martin@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567804', 'Noah Martin', 'Architect with expertise in green building practices.', 'architect', 'Surabaya', 1000000),
    ('2b5c6d7f-c9c5-4210-8431-f773aaf47e49', 'ava.mitchell@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567806', 'Ava Mitchell', 'Architect focusing on large-scale urban projects.', 'architect', 'Bandung', 910000),
    ('3b16c9f5-b64a-4b3e-8c5e-bd94f5f48a3a', 'liam.mitchell@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567808', 'Liam Mitchell', 'Architect with a focus on sustainable design practices.', 'architect', 'Jakarta', 1210000),
    ('4b21f7c4-8de5-44db-9b13-81b3e20fc3d0', 'isabella.perez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567810', 'Isabella Perez', 'Architect specializing in public spaces.', 'architect', 'Surabaya', 950000),
    ('5d8d4b55-41c3-4651-b2ff-68d7e0a1c2eb', 'james.evans@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567812', 'James Evans', 'Architect focusing on energy-efficient buildings.', 'architect', 'Bandung', 1040000),
    ('6d9f5d47-4ed5-4d39-b65a-c9e6ecb9ff5e', 'olivia.morgan@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567814', 'Olivia Morgan', 'Architect with a passion for cultural architecture.', 'architect', 'Jakarta', 780000),
    ('7d7b4e4b-5c0d-4733-bcb6-674e3b569b5c', 'liam.cooper@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567816', 'Liam Cooper', 'Architect focusing on waterfront architecture.', 'architect', 'Surabaya', 1190000),
    ('8d8e6e77-6e18-4b2a-91c6-70b0e544b9df', 'ava.ramirez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567818', 'Ava Ramirez', 'Architect specializing in high-density urban areas.', 'architect', 'Bandung', 970000),
    ('9e7e7b6e-7f3d-4d19-8bdf-7196a577fa36', 'noah.murphy@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567820', 'Noah Murphy', 'Architect with expertise in vernacular architecture.', 'architect', 'Jakarta', 1000000),
    ('0f6b8a76-8f65-4d85-bef9-826b3b3f90fa', 'isabella.reed@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567822', 'Isabella Reed', 'Architect focusing on community-focused designs.', 'architect', 'Surabaya', 860000),
    ('1f9b9b7b-9f29-4d1f-9c69-92b4bcb4a0b6', 'liam.wright@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567824', 'Liam Wright', 'Architect specializing in innovative structural designs.', 'architect', 'Bandung', 1120000),
    ('2fa67d94-af88-4fa7-8d99-a327f9d7a38e', 'ava.king@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567826', 'Ava King', 'Architect with a focus on sustainable landscapes.', 'architect', 'Jakarta', 1180000),
    ('3f9c7d86-bfa8-47a6-a5df-b1b7f3b7bfa6', 'olivia.scott@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567828', 'Olivia Scott', 'Architect focusing on low-cost housing solutions.', 'architect', 'Surabaya', 780000),
    ('4fd68b5c-b0ca-4da3-9bc4-c1b6c5d5f6e6', 'liam.baker@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567830', 'Liam Baker', 'Architect specializing in urban infrastructure.', 'architect', 'Bandung', 1060000);
`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
