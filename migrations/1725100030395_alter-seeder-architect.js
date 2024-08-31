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
    ('p1p1p1p1-1p1p-1p1p-1p1p-1p1p1p1p1p1p', 'lucas.martinez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567840', 'Lucas Martinez', 'Architect with a focus on futuristic designs.', 'architect', 'Bandung', 890000),
    ('q2q2q2q2-2q2q-2q2q-2q2q-2q2q2q2q2q2q', 'amelia.rodriguez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567842', 'Amelia Rodriguez', 'Architect specialized in cultural and heritage buildings.', 'architect', 'Jakarta', 1050000),
    ('r3r3r3r3-3r3r-3r3r-3r3r-3r3r3r3r3r3r', 'elijah.smith@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567844', 'Elijah Smith', 'Architect focused on luxury residential design.', 'architect', 'Surabaya', 1130000),
    ('s4s4s4s4-4s4s-4s4s-4s4s-4s4s4s4s4s4s', 'evelyn.johnson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567846', 'Evelyn Johnson', 'Architect with expertise in industrial architecture.', 'architect', 'Bandung', 920000),
    ('t5t5t5t5-5t5t-5t5t-5t5t-5t5t5t5t5t5t', 'henry.moore@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567848', 'Henry Moore', 'Architect specializing in urban redevelopment projects.', 'architect', 'Jakarta', 870000),
    ('u6u6u6u6-6u6u-6u6u-6u6u-6u6u6u6u6u6u', 'ava.taylor@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567850', 'Ava Taylor', 'Architect with a passion for landscape architecture.', 'architect', 'Surabaya', 750000),
    ('v7v7v7v7-7v7v-7v7v-7v7v-7v7v7v7v7v7v', 'alex.sanchez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567852', 'Alex Sanchez', 'Architect focused on mixed-use developments.', 'architect', 'Bandung', 1170000),
    ('w8w8w8w8-8w8w-8w8w-8w8w-8w8w8w8w8w8w', 'mia.morris@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567854', 'Mia Morris', 'Architect with expertise in sustainable design.', 'architect', 'Jakarta', 990000),
    ('x9x9x9x9-9x9x-9x9x-9x9x-9x9x9x9x9x9x', 'noah.lee@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567856', 'Noah Lee', 'Architect specialized in healthcare facilities.', 'architect', 'Surabaya', 1070000),
    ('y0y0y0y0-0y0y-0y0y-0y0y-0y0y0y0y0y0y', 'sophia.clark@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567858', 'Sophia Clark', 'Architect focusing on innovative school designs.', 'architect', 'Bandung', 850000),
    ('z1z1z1z1-1z1z-1z1z-1z1z-1z1z1z1z1z1z', 'william.davis@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567860', 'William Davis', 'Architect passionate about urban sustainability.', 'architect', 'Jakarta', 1110000),
    ('a2a2a2a2-2a2a-2a2a-2a2a-2a2a2a2a2a2a', 'amelia.hall@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567862', 'Amelia Hall', 'Architect specializing in smart city projects.', 'architect', 'Surabaya', 880000),
    ('b3b3b3b3-3b3b-3b3b-3b3b-3b3b3b3b3b3b', 'james.white@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567864', 'James White', 'Architect with a focus on modern office spaces.', 'architect', 'Bandung', 970000),
    ('c4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c', 'isabella.thomas@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567866', 'Isabella Thomas', 'Architect specialized in sustainable housing.', 'architect', 'Jakarta', 1010000),
    ('d5d5d5d5-5d5d-5d5d-5d5d-5d5d5d5d5d5d', 'lucas.jackson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567868', 'Lucas Jackson', 'Architect passionate about integrating technology in design.', 'architect', 'Surabaya', 1180000),
    ('e6e6e6e6-6e6e-6e6e-6e6e-6e6e6e6e6e6e', 'emma.miller@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567870', 'Emma Miller', 'Architect specializing in adaptive reuse projects.', 'architect', 'Bandung', 1090000),
    ('f7f7f7f7-7f7f-7f7f-7f7f-7f7f7f7f7f7f', 'logan.anderson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567872', 'Logan Anderson', 'Architect specializing in high-tech architecture.', 'architect', 'Jakarta', 1120000),
    ('g8g8g8g8-8g8g-8g8g-8g8g-8g8g8g8g8g8g', 'sofia.hernandez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567874', 'Sofia Hernandez', 'Architect focusing on urban agriculture.', 'architect', 'Surabaya', 1030000),
    ('h9h9h9h9-9h9h-9h9h-9h9h-9h9h9h9h9h9h', 'oliver.perez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567876', 'Oliver Perez', 'Architect specializing in modular design.', 'architect', 'Bandung', 760000),
    ('i0i0i0i0-0i0i-0i0i-0i0i-0i0i0i0i0i0i', 'mason.roberts@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567878', 'Mason Roberts', 'Architect with expertise in coastal architecture.', 'architect', 'Jakarta', 1250000),
    ('j1j1j1j1-1j1j-1j1j-1j1j-1j1j1j1j1j1j', 'emily.wilson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567880', 'Emily Wilson', 'Architect focusing on eco-friendly office designs.', 'architect', 'Surabaya', 810000),
    ('k2k2k2k2-2k2k-2k2k-2k2k-2k2k2k2k2k2k', 'olivia.carter@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567882', 'Olivia Carter', 'Architect with a focus on urban infill projects.', 'architect', 'Bandung', 940000),
    ('l3l3l3l3-3l3l-3l3l-3l3l-3l3l3l3l3l3l', 'liam.evans@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567884', 'Liam Evans', 'Architect specializing in residential interior design.', 'architect', 'Jakarta', 1010000),
    ('m4m4m4m4-4m4m-4m4m-4m4m-4m4m4m4m4m4m', 'sophia.turner@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567886', 'Sophia Turner', 'Architect focusing on community-based design.', 'architect', 'Surabaya', 870000),
    ('n5n5n5n5-5n5n-5n5n-5n5n-5n5n5n5n5n5n', 'logan.ward@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567888', 'Logan Ward', 'Architect with expertise in hospitality design.', 'architect', 'Bandung', 1190000),
    ('o6o6o6o6-6o6o-6o6o-6o6o-6o6o6o6o6o6o', 'emma.cooper@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567890', 'Emma Cooper', 'Architect specializing in urban planning.', 'architect', 'Jakarta', 950000),
    ('p7p7p7p7-7p7p-7p7p-7p7p-7p7p7p7p7p7p', 'james.kelly@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567892', 'James Kelly', 'Architect with a focus on sustainable materials.', 'architect', 'Surabaya', 1030000),
    ('q8q8q8q8-8q8q-8q8q-8q8q-8q8q8q8q8q8q', 'sophia.anderson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567894', 'Sophia Anderson', 'Architect specializing in prefab architecture.', 'architect', 'Bandung', 770000),
    ('r9r9r9r9-9r9r-9r9r-9r9r-9r9r9r9r9r9r', 'oliver.harris@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567896', 'Oliver Harris', 'Architect with expertise in urban housing.', 'architect', 'Jakarta', 1110000),
    ('s0s0s0s0-0s0s-0s0s-0s0s-0s0s0s0s0s0s', 'mia.jackson@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567898', 'Mia Jackson', 'Architect specializing in museum design.', 'architect', 'Surabaya', 890000),
    ('t1t1t1t1-1t1t-1t1t-1t1t-1t1t1t1t1t1t', 'liam.jones@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567800', 'Liam Jones', 'Architect with a focus on urban mobility.', 'architect', 'Bandung', 1220000),
    ('u2u2u2u2-2u2u-2u2u-2u2u-2u2u2u2u2u2u', 'olivia.garcia@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567802', 'Olivia Garcia', 'Architect focusing on sustainable infrastructure.', 'architect', 'Jakarta', 950000),
    ('v3v3v3v3-3v3v-3v3v-3v3v-3v3v3v3v3v3v', 'noah.martin@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567804', 'Noah Martin', 'Architect with expertise in green building practices.', 'architect', 'Surabaya', 1000000),
    ('w4w4w4w4-4w4w-4w4w-4w4w-4w4w4w4w4w4w', 'ava.mitchell@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567806', 'Ava Mitchell', 'Architect focusing on large-scale urban projects.', 'architect', 'Bandung', 910000),
    ('x5x5x5x5-5x5x-5x5x-5x5x-5x5x5x5x5x5x', 'liam.mitchell@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567808', 'Liam Mitchell', 'Architect with a focus on sustainable design practices.', 'architect', 'Jakarta', 1210000),
    ('y6y6y6y6-6y6y-6y6y-6y6y-6y6y6y6y6y6y', 'isabella.perez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567810', 'Isabella Perez', 'Architect specializing in public spaces.', 'architect', 'Surabaya', 950000),
    ('z7z7z7z7-7z7z-7z7z-7z7z-7z7z7z7z7z7z', 'james.evans@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567812', 'James Evans', 'Architect focusing on energy-efficient buildings.', 'architect', 'Bandung', 1040000),
    ('a8a8a8a8-8a8a-8a8a-8a8a-8a8a8a8a8a8a', 'olivia.morgan@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567814', 'Olivia Morgan', 'Architect with a passion for cultural architecture.', 'architect', 'Jakarta', 780000),
    ('b9b9b9b9-9b9b-9b9b-9b9b-9b9b9b9b9b9b', 'liam.cooper@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567816', 'Liam Cooper', 'Architect focusing on waterfront architecture.', 'architect', 'Surabaya', 1190000),
    ('c0c0c0c0-0c0c-0c0c-0c0c-0c0c0c0c0c0c', 'ava.ramirez@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567818', 'Ava Ramirez', 'Architect specializing in high-density urban areas.', 'architect', 'Bandung', 970000),
    ('d1d1d1d1-1d1d-1d1d-1d1d-1d1d1d1d1d1d', 'noah.murphy@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567820', 'Noah Murphy', 'Architect with expertise in vernacular architecture.', 'architect', 'Jakarta', 1000000),
    ('e2e2e2e2-2e2e-2e2e-2e2e-2e2e2e2e2e2e', 'isabella.reed@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567822', 'Isabella Reed', 'Architect focusing on community-focused designs.', 'architect', 'Surabaya', 860000),
    ('f3f3f3f3-3f3f-3f3f-3f3f-3f3f3f3f3f3f', 'liam.wright@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567824', 'Liam Wright', 'Architect specializing in innovative structural designs.', 'architect', 'Bandung', 1120000),
    ('g4g4g4g4-4g4g-4g4g-4g4g-4g4g4g4g4g4g', 'ava.king@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567826', 'Ava King', 'Architect with a focus on sustainable landscapes.', 'architect', 'Jakarta', 1180000),
    ('h5h5h5h5-5h5h-5h5h-5h5h-5h5h5h5h5h5h', 'olivia.scott@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567828', 'Olivia Scott', 'Architect focusing on low-cost housing solutions.', 'architect', 'Surabaya', 780000),
    ('i6i6i6i6-6i6i-6i6i-6i6i-6i6i6i6i6i6i', 'liam.baker@example.com', '$2b$10$PsYWob34XOdjFD7rC2GjyeP2rudb4hnsdWEFNF19vhp1ZkC61HYyS', '081234567830', 'Liam Baker', 'Architect specializing in urban infrastructure.', 'architect', 'Bandung', 1060000);
    
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
