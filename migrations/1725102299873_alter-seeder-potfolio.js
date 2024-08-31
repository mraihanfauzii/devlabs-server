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
    INSERT INTO portofolios (id, architect_id, name, description, theme_id, estimated_budget)
    VALUES
    ('130ab61f-54e1-47df-8674-4b0ad473fc72', 'p1p1p1p1-1p1p-1p1p-1p1p-1p1p1p1p1p1p', 'Modern Home Design', 'A modern home design with a focus on minimalism and functionality.', (SELECT id FROM themes WHERE name = 'Modern'), 100000),
    ('25b18497-2552-47b6-a0dd-e50047fc70ed', 'q2q2q2q2-2q2q-2q2q-2q2q-2q2q2q2q2q2q', 'Cozy Modern Home', 'A cozy modern home design with a warm and inviting atmosphere.', (SELECT id FROM themes WHERE name = 'Modern'), 150000),
    ('3765718c-f23a-46b3-a27d-7cb7d4b6590c', 'r3r3r3r3-3r3r-3r3r-3r3r-3r3r3r3r3r3r', 'Luxury Modern Home', 'A luxury modern home design with a focus on elegance and sophistication.', (SELECT id FROM themes WHERE name = 'Modern'), 200000),
    ('41227778-659e-42e6-a0a6-2b8575b1f328', 's4s4s4s4-4s4s-4s4s-4s4s-4s4s4s4s4s4s', 'Asian Inspired Home', 'An Asian inspired home design with traditional elements and modern amenities.', (SELECT id FROM themes WHERE name = 'Asian'), 120000),
    ('5f79aa65-8f33-4f6e-a7c0-69e222d06fe8', 't5t5t5t5-5t5t-5t5t-5t5t-5t5t5t5t5t5t', 'Asian Fusion Home', 'An Asian fusion home design that combines traditional and modern elements.', (SELECT id FROM themes WHERE name = 'Asian'), 180000),
    ('67ab02a5-2f88-4591-bb46-0dc491832d38', 'u6u6u6u6-6u6u-6u6u-6u6u-6u6u6u6u6u6u', 'Asian Zen Home', 'An Asian zen home design that promotes tranquility and relaxation.', (SELECT id FROM themes WHERE name = 'Asian'), 250000),
    ('732760dd-5373-4283-b22c-e4cadd110fb0', 'v7v7v7v7-7v7v-7v7v-7v7v-7v7v7v7v7v7v', 'Tropical Paradise Home', 'A tropical paradise home design with lush greenery and open spaces.', (SELECT id FROM themes WHERE name = 'Tropical'), 300000),
    ('87004559-d680-4c8e-aba0-b3e339303977', 'w8w8w8w8-8w8w-8w8w-8w8w-8w8w8w8w8w8w', 'Tropical Oasis Home', 'A tropical oasis home design with a focus on outdoor living and natural elements.', (SELECT id FROM themes WHERE name = 'Tropical'), 350000),
    ('9987dc75-ec65-422d-a9f3-4b1ccc2a4e87', 'x9x9x9x9-9x9x-9x9x-9x9x-9x9x9x9x9x9x', 'Tropical Retreat Home', 'A tropical retreat home design that offers a peaceful and serene environment.', (SELECT id FROM themes WHERE name = 'Tropical'), 400000),
    ('010112af-a82e-4048-b801-c799610e7eef', 'y0y0y0y0-0y0y-0y0y-0y0y-0y0y0y0y0y0y', 'Traditional Manor Home', 'A traditional manor home design with classic architectural details and timeless elegance.', (SELECT id FROM themes WHERE name = 'Traditional'), 500000),
    ('144c9928-c1db-46ad-ae30-07b3b274effc', 'z1z1z1z1-1z1z-1z1z-1z1z-1z1z1z1z1z1z', 'Traditional Cottage Home', 'A traditional cottage home design with a cozy and charming atmosphere.', (SELECT id FROM themes WHERE name = 'Traditional'), 550000),
    ('2fd443c1-157f-40c7-b4c1-c61ebe03af22', 'a2a2a2a2-2a2a-2a2a-2a2a-2a2a2a2a2a2a', 'Traditional Farmhouse Home', 'A traditional farmhouse home design with rustic elements and modern amenities.', (SELECT id FROM themes WHERE name = 'Traditional'), 600000),
    ('34e4e316-f33e-4875-8101-a8e640663f19', 'b3b3b3b3-3b3b-3b3b-3b3b-3b3b3b3b3b3b', 'Contemporary Loft Home', 'A contemporary loft home design with an open floor plan and industrial accents.', (SELECT id FROM themes WHERE name = 'Contemporary'), 700000),
    ('40253382-d117-4916-8c8f-9f9033f6c1ff', 'c4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c', 'Contemporary Penthouse Home', 'A contemporary penthouse home design with panoramic views and luxurious amenities.', (SELECT id FROM themes WHERE name = 'Contemporary'), 750000),
    ('587282e6-a331-4a12-b5e5-bcdca2bc903d', 'd5d5d5d5-5d5d-5d5d-5d5d-5d5d5d5d5d5d', 'Contemporary Townhouse Home', 'A contemporary townhouse home design with a sleek and modern aesthetic.', (SELECT id FROM themes WHERE name = 'Contemporary'), 800000),
    ('671a2a6c-5a7f-4e93-a7f5-1c7cb11024c0', 'e6e6e6e6-6e6e-6e6e-6e6e-6e6e6e6e6e6e', 'Victorian Mansion Home', 'A victorian mansion home design with ornate details and grandeur.', (SELECT id FROM themes WHERE name = 'Victorian'), 900000),
    ('7b010534-f488-4891-b988-dd313d07e75c', 'f7f7f7f7-7f7f-7f7f-7f7f-7f7f7f7f7f7f', 'Victorian Cottage Home', 'A victorian cottage home design with charming features and a cozy atmosphere.', (SELECT id FROM themes WHERE name = 'Victorian'), 950000),
    ('85b75f4e-1ee1-453b-9b08-94d8ab63f8dc', 'g8g8g8g8-8g8g-8g8g-8g8g-8g8g8g8g8g8g', 'Victorian Townhouse Home', 'A victorian townhouse home design with elegant architecture and timeless style.', (SELECT id FROM themes WHERE name = 'Victorian'), 1000000),
    ('90c9ab8c-870c-43e0-a1db-fe8653d9ab04', 'h9h9h9h9-9h9h-9h9h-9h9h-9h9h9h9h9h9h', 'Industrial Loft Home', 'An industrial loft home design with exposed brick and metal accents.', (SELECT id FROM themes WHERE name = 'Industrial'), 1100000),
    ('0b61481d-4cfc-4080-972d-70b0af306492', 'i0i0i0i0-0i0i-0i0i-0i0i-0i0i0i0i0i0i', 'Industrial Warehouse Home', 'An industrial warehouse home design with a raw and edgy aesthetic.', (SELECT id FROM themes WHERE name = 'Industrial'), 1150000),
    ('1238962b-ca4b-418e-afa3-8bcf40772064', 'j1j1j1j1-1j1j-1j1j-1j1j-1j1j1j1j1j1j', 'Industrial Studio Home', 'An industrial studio home design with an open and flexible layout.', (SELECT id FROM themes WHERE name = 'Industrial'), 1200000),
    ('24f594a4-2c3f-46cd-b5cd-0ab80393480a', 'k2k2k2k2-2k2k-2k2k-2k2k-2k2k2k2k2k2k', 'Rustic Cabin Home', 'A rustic cabin home design with natural materials and a cozy atmosphere.', (SELECT id FROM themes WHERE name = 'Rustic'), 1300000),
    ('35e3c1f3-2c7f-4f6e-8c2f-0c7b0f6e3a8d', 'l3l3l3l3-3l3l-3l3l-3l3l-3l3l3l3l3l3l', 'Rustic Lodge Home', 'A rustic lodge home design with a warm and inviting atmosphere.', (SELECT id FROM themes WHERE name = 'Rustic'), 1350000),
    ('41c2f4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 'm4m4m4m4-4m4m-4m4m-4m4m-4m4m4m4m4m4m', 'Rustic Retreat Home', 'A rustic retreat home design with a focus on natural beauty and simplicity.', (SELECT id FROM themes WHERE name = 'Rustic'), 1400000),
    ('54c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'n5n5n5n5-5n5n-5n5n-5n5n-5n5n5n5n5n5n', 'Minimalist Studio Home', 'A minimalist studio home design with a clean and uncluttered aesthetic.', (SELECT id FROM themes WHERE name = 'Minimalist'), 1500000),
    ('64c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'o6o6o6o6-6o6o-6o6o-6o6o-6o6o6o6o6o6o', 'Minimalist Loft Home', 'A minimalist loft home design with an open and airy atmosphere.', (SELECT id FROM themes WHERE name = 'Minimalist'), 1550000),
    ('74c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'p7p7p7p7-7p7p-7p7p-7p7p-7p7p7p7p7p7p', 'Minimalist Townhouse Home', 'A minimalist townhouse home design with a focus on simplicity and functionality.', (SELECT id FROM themes WHERE name = 'Minimalist'), 1600000),
    ('8049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'q8q8q8q8-8q8q-8q8q-8q8q-8q8q8q8q8q8q', 'Modern Cozy Home', 'A modern cozy home design with a warm and inviting atmosphere.', (SELECT id FROM themes WHERE name = 'Modern'), 1700000),
    ('9049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'r9r9r9r9-9r9r-9r9r-9r9r-9r9r9r9r9r9r', 'Modern Luxury Home', 'A modern luxury home design with a focus on elegance and sophistication.', (SELECT id FROM themes WHERE name = 'Modern'), 1800000),
    ('0049d2c6-9df0-4d3d-9d18-ddc63beb408e', 's0s0s0s0-0s0s-0s0s-0s0s-0s0s0s0s0s0s', 'Modern Home', 'A modern asian home design with traditional elements and modern amenities.', (SELECT id FROM themes WHERE name = 'Modern'), 1900000),
    ('1049d2c6-9df0-4d3d-9d18-ddc63beb408e', 't1t1t1t1-1t1t-1t1t-1t1t-1t1t1t1t1t1t', 'Modern Asian Fusion Home', 'A modern asian fusion home design that combines traditional and modern elements.', (SELECT id FROM themes WHERE name = 'Asian'), 2000000),
    ('2049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'u2u2u2u2-2u2u-2u2u-2u2u-2u2u2u2u2u2u', 'Modern Asian Zen Home', 'A modern asian zen home design that promotes tranquility and relaxation.', (SELECT id FROM themes WHERE name = 'Asian'), 2100000),
    ('3049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'v3v3v3v3-3v3v-3v3v-3v3v-3v3v3v3v3v3v', 'Asian Paradise Home', 'A modern tropical paradise home design with lush greenery and open spaces.', (SELECT id FROM themes WHERE name = 'Asian'), 2200000),
    ('4049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'w4w4w4w4-4w4w-4w4w-4w4w-4w4w4w4w4w4w', 'Asian Oasis Home', 'A modern tropical oasis home design with a focus on outdoor living and natural elements.', (SELECT id FROM themes WHERE name = 'Tropical'), 2300000),
    ('5049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'x5x5x5x5-5x5x-5x5x-5x5x-5x5x5x5x5x5x', 'Asian Retreat Home', 'A modern tropical retreat home design that offers a peaceful and serene environment.', (SELECT id FROM themes WHERE name = 'Tropical'), 2400000),
    ('6049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'y6y6y6y6-6y6y-6y6y-6y6y-6y6y6y6y6y6y', 'Traditional Manor Home', 'A modern traditional manor home design with classic architectural details and timeless elegance.', (SELECT id FROM themes WHERE name = 'Traditional'), 2500000),
    ('7049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'z7z7z7z7-7z7z-7z7z-7z7z-7z7z7z7z7z7z', 'Traditional Cottage Home', 'A modern traditional cottage home design with a cozy and charming atmosphere.', (SELECT id FROM themes WHERE name = 'Traditional'), 2600000),
    ('8049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'a8a8a8a8-8a8a-8a8a-8a8a-8a8a8a8a8a8a', 'Traditional Farmhouse Home', 'A modern traditional farmhouse home design with rustic elements and modern amenities.', (SELECT id FROM themes WHERE name = 'Traditional'), 2700000),
    ('9049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'b9b9b9b9-9b9b-9b9b-9b9b-9b9b9b9b9b9b', 'Contemporary Loft Home', 'A modern contemporary loft home design with an open floor plan and industrial accents.', (SELECT id FROM themes WHERE name = 'Contemporary'), 2800000),
    ('0049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'c0c0c0c0-0c0c-0c0c-0c0c-0c0c0c0c0c0c', 'Contemporary Penthouse Home', 'A modern contemporary penthouse home design with panoramic views and luxurious amenities.', (SELECT id FROM themes WHERE name = 'Contemporary'), 2900000),
    ('1049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'd1d1d1d1-1d1d-1d1d-1d1d-1d1d1d1d1d1d', 'Contemporary Townhouse Home', 'A modern contemporary townhouse home design with a sleek and modern aesthetic.', (SELECT id FROM themes WHERE name = 'Contemporary'), 3000000),
    ('2049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'e2e2e2e2-2e2e-2e2e-2e2e-2e2e2e2e2e2e', 'Victorian Mansion Home', 'A modern victorian mansion home design with ornate details and grandeur.', (SELECT id FROM themes WHERE name = 'Victorian'), 3100000),
    ('3149d2c6-9df0-4d3d-9d18-ddc63beb408e', 'f3f3f3f3-3f3f-3f3f-3f3f-3f3f3f3f3f3f', 'Victorian Cottage Home', 'A modern victorian cottage home design with charming features and a cozy atmosphere.', (SELECT id FROM themes WHERE name = 'Victorian'), 3200000),
    ('4249d2c6-9df0-4d3d-9d18-ddc63beb408e', 'g4g4g4g4-4g4g-4g4g-4g4g-4g4g4g4g4g4g', 'Victorian Townhouse Home', 'A modern victorian townhouse home design with elegant architecture and timeless style.', (SELECT id FROM themes WHERE name = 'Victorian'), 3300000);
  `);

  pgm.sql(`
    INSERT INTO portofolio_attachments (portofolio_id, name, path)
    VALUES
    ('130ab61f-54e1-47df-8674-4b0ad473fc72', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('25b18497-2552-47b6-a0dd-e50047fc70ed', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('3765718c-f23a-46b3-a27d-7cb7d4b6590c', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('41227778-659e-42e6-a0a6-2b8575b1f328', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('5f79aa65-8f33-4f6e-a7c0-69e222d06fe8', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('67ab02a5-2f88-4591-bb46-0dc491832d38', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('732760dd-5373-4283-b22c-e4cadd110fb0', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('87004559-d680-4c8e-aba0-b3e339303977', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('9987dc75-ec65-422d-a9f3-4b1ccc2a4e87', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('010112af-a82e-4048-b801-c799610e7eef', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('144c9928-c1db-46ad-ae30-07b3b274effc', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('2fd443c1-157f-40c7-b4c1-c61ebe03af22', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('34e4e316-f33e-4875-8101-a8e640663f19', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('40253382-d117-4916-8c8f-9f9033f6c1ff', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('587282e6-a331-4a12-b5e5-bcdca2bc903d', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('671a2a6c-5a7f-4e93-a7f5-1c7cb11024c0', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('7b010534-f488-4891-b988-dd313d07e75c', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('85b75f4e-1ee1-453b-9b08-94d8ab63f8dc', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('90c9ab8c-870c-43e0-a1db-fe8653d9ab04', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('0b61481d-4cfc-4080-972d-70b0af306492', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('1238962b-ca4b-418e-afa3-8bcf40772064', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('24f594a4-2c3f-46cd-b5cd-0ab80393480a', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('35e3c1f3-2c7f-4f6e-8c2f-0c7b0f6e3a8d', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('41c2f4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('54c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('64c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('74c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('8049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('9049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('0049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('1049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('2049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('3049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('4049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('5049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('6049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('7049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('8049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('9049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('0049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('1049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('2049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('3149d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('4249d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg');
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
