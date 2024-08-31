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
    ('130ab61f-54e1-47df-8674-4b0ad473fc72', '1d831d2a-4b68-431b-ae76-ddecd85e967e', 'Modern Home Design', 'A modern home design with a focus on minimalism and functionality.', (SELECT id FROM themes WHERE name = 'Modern'), 100000),
    ('25b18497-2552-47b6-a0dd-e50047fc70ed', '2a94a1bb-705c-4825-9a4e-cf4e67bfc718', 'Cozy Modern Home', 'A cozy modern home design with a warm and inviting atmosphere.', (SELECT id FROM themes WHERE name = 'Modern'), 150000),
    ('3765718c-f23a-46b3-a27d-7cb7d4b6590c', '3f3ab6e0-d4ad-45e4-8759-f9c9e12b0077', 'Luxury Modern Home', 'A luxury modern home design with a focus on elegance and sophistication.', (SELECT id FROM themes WHERE name = 'Modern'), 200000),
    ('41227778-659e-42e6-a0a6-2b8575b1f328', '4f63b1a1-6e74-40ed-9fb3-88ec14f69c5f', 'Asian Inspired Home', 'An Asian inspired home design with traditional elements and modern amenities.', (SELECT id FROM themes WHERE name = 'Asian'), 120000),
    ('5f79aa65-8f33-4f6e-a7c0-69e222d06fe8', '5fda48d4-15f5-4c5a-b7d6-52b4c82c7e1a', 'Asian Fusion Home', 'An Asian fusion home design that combines traditional and modern elements.', (SELECT id FROM themes WHERE name = 'Asian'), 180000),
    ('67ab02a5-2f88-4591-bb46-0dc491832d38', '65c4d85f-c16e-4db1-80c5-3ff53a9c7e2d', 'Asian Zen Home', 'An Asian zen home design that promotes tranquility and relaxation.', (SELECT id FROM themes WHERE name = 'Asian'), 250000),
    ('732760dd-5373-4283-b22c-e4cadd110fb0', '7a4a142b-2640-48c0-a7b0-82a44b6958b9', 'Tropical Paradise Home', 'A tropical paradise home design with lush greenery and open spaces.', (SELECT id FROM themes WHERE name = 'Tropical'), 300000),
    ('87004559-d680-4c8e-aba0-b3e339303977', '8a5c3219-9371-47ec-9614-b172e2e1e074', 'Tropical Oasis Home', 'A tropical oasis home design with a focus on outdoor living and natural elements.', (SELECT id FROM themes WHERE name = 'Tropical'), 350000),
    ('9987dc75-ec65-422d-a9f3-4b1ccc2a4e87', '9d52cce8-25af-46b4-8fa2-511bc6d22662', 'Tropical Retreat Home', 'A tropical retreat home design that offers a peaceful and serene environment.', (SELECT id FROM themes WHERE name = 'Tropical'), 400000),
    ('010112af-a82e-4048-b801-c799610e7eef', 'a08c3647-41d3-4b6c-8915-499446b0ac69', 'Traditional Manor Home', 'A traditional manor home design with classic architectural details and timeless elegance.', (SELECT id FROM themes WHERE name = 'Traditional'), 500000),
    ('144c9928-c1db-46ad-ae30-07b3b274effc', 'b81e0d59-c0db-486b-9346-1e84c635da65', 'Traditional Cottage Home', 'A traditional cottage home design with a cozy and charming atmosphere.', (SELECT id FROM themes WHERE name = 'Traditional'), 550000),
    ('2cd443c1-157f-40c7-b4c1-c61ebe03af22', 'c3e88bb7-9a7e-4f77-a4c2-fbc9cc8bb9e3', 'Traditional Farmhouse Home', 'A traditional farmhouse home design with rustic elements and modern amenities.', (SELECT id FROM themes WHERE name = 'Traditional'), 600000),
    ('34e4e316-f33e-4875-8101-a8e640663f19', 'd5c4a38b-f53a-4a39-871b-2925d85f99f0', 'Contemporary Loft Home', 'A contemporary loft home design with an open floor plan and industrial accents.', (SELECT id FROM themes WHERE name = 'Contemporary'), 700000),
    ('40253382-d117-4916-8c8f-9f9033f6c1ff', 'e9722e21-4b4f-4bde-9155-c13a69b1494d', 'Contemporary Penthouse Home', 'A contemporary penthouse home design with panoramic views and luxurious amenities.', (SELECT id FROM themes WHERE name = 'Contemporary'), 750000),
    ('587282e6-a331-4a12-b5e5-bcdca2bc903d', 'fc8b68a7-605c-4aeb-a38c-4f7074c9d8ae', 'Contemporary Townhouse Home', 'A contemporary townhouse home design with a sleek and modern aesthetic.', (SELECT id FROM themes WHERE name = 'Contemporary'), 800000),
    ('671a2a6c-5a7f-4e93-a7f5-1c7cb11024c0', '05dd2e84-16e0-44f4-8b9d-f18f8d2a5694', 'Victorian Mansion Home', 'A victorian mansion home design with ornate details and grandeur.', (SELECT id FROM themes WHERE name = 'Victorian'), 900000),
    ('7b010534-f488-4891-b988-dd313d07e75c', '162e77e2-7b6f-4887-9450-54b9b1a64674', 'Victorian Cottage Home', 'A victorian cottage home design with charming features and a cozy atmosphere.', (SELECT id FROM themes WHERE name = 'Victorian'), 950000),
    ('85b75f4e-1ee1-453b-9b08-94d8ab63f8dc', '287d7a8f-97b5-47eb-bc3c-6b2a86a5d162', 'Victorian Townhouse Home', 'A victorian townhouse home design with elegant architecture and timeless style.', (SELECT id FROM themes WHERE name = 'Victorian'), 1000000),
    ('90c9ab8c-870c-43e0-a1db-fe8653d9ab04', '3a46ff3a-c238-4bc5-b2d4-0ed84bb8c39f', 'Industrial Loft Home', 'An industrial loft home design with exposed brick and metal accents.', (SELECT id FROM themes WHERE name = 'Industrial'), 1100000),
    ('0b61481d-4cfc-4080-972d-70b0af306492', '4c86c919-cf93-4386-a1d5-45b0a65b4e4e', 'Industrial Warehouse Home', 'An industrial warehouse home design with a raw and edgy aesthetic.', (SELECT id FROM themes WHERE name = 'Industrial'), 1150000),
    ('1238962b-ca4b-418e-afa3-8bcf40772064', '51e7b7f7-b6e1-4a30-bfae-dc567019dd3d', 'Industrial Studio Home', 'An industrial studio home design with an open and flexible layout.', (SELECT id FROM themes WHERE name = 'Industrial'), 1200000),
    ('24f594a4-2c3f-46cd-b5cd-0ab80393480a', '6e21b614-2b91-4c17-9636-f9a7719230f0', 'Rustic Cabin Home', 'A rustic cabin home design with natural materials and a cozy atmosphere.', (SELECT id FROM themes WHERE name = 'Rustic'), 1300000),
    ('35e3c1f3-2c7f-4f6e-8c2f-0c7b0f6e3a8d', '707b2ecb-d5d8-4e17-abc4-8f5b7843d097', 'Rustic Lodge Home', 'A rustic lodge home design with a warm and inviting atmosphere.', (SELECT id FROM themes WHERE name = 'Rustic'), 1350000),
    ('41c2f4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', '84a7b18d-846b-40d7-bab9-cb7455beaad0', 'Rustic Retreat Home', 'A rustic retreat home design with a focus on natural beauty and simplicity.', (SELECT id FROM themes WHERE name = 'Rustic'), 1400000),
    ('54c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', '9d50f10f-fd6f-49d0-ace8-f59746e87454', 'Minimalist Studio Home', 'A minimalist studio home design with a clean and uncluttered aesthetic.', (SELECT id FROM themes WHERE name = 'Minimalist'), 1500000),
    ('64c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'a12b2b0b-0b3f-4de7-b3e0-c89f4bb1a56b', 'Minimalist Loft Home', 'A minimalist loft home design with an open and airy atmosphere.', (SELECT id FROM themes WHERE name = 'Minimalist'), 1550000),
    ('74c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'bc9f6d5d-5a8d-474b-b573-c3ac2c46f2f5', 'Minimalist Townhouse Home', 'A minimalist townhouse home design with a focus on simplicity and functionality.', (SELECT id FROM themes WHERE name = 'Minimalist'), 1600000),
    ('9049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'd87a2c85-8470-4db5-917e-c77c617ec80e', 'Modern Luxury Home', 'A modern luxury home design with a focus on elegance and sophistication.', (SELECT id FROM themes WHERE name = 'Modern'), 1800000),
    ('0049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'e6b0f1f0-d76e-41da-aed4-e3c789d947e6', 'Modern Home', 'A modern asian home design with traditional elements and modern amenities.', (SELECT id FROM themes WHERE name = 'Modern'), 1900000),
    ('1049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'f7b8b29f-2fd8-4c71-88bb-2e84e38f41f7', 'Modern Asian Fusion Home', 'A modern asian fusion home design that combines traditional and modern elements.', (SELECT id FROM themes WHERE name = 'Asian'), 2000000),
    ('2049d2c6-9df0-4d3d-9d18-ddc63beb408e', '0e79e5e4-682d-4717-97e6-cf029a15683a', 'Modern Asian Zen Home', 'A modern asian zen home design that promotes tranquility and relaxation.', (SELECT id FROM themes WHERE name = 'Asian'), 2100000),
    ('3049d2c6-9df0-4d3d-9d18-ddc63beb408e', '1e25c4a9-7c22-4a7e-a3b6-169bf33760a2', 'Asian Paradise Home', 'A modern tropical paradise home design with lush greenery and open spaces.', (SELECT id FROM themes WHERE name = 'Asian'), 2200000),
    ('4049d2c6-9df0-4d3d-9d18-ddc63beb408e', '2b5c6d7f-c9c5-4210-8431-f773aaf47e49', 'Asian Oasis Home', 'A modern tropical oasis home design with a focus on outdoor living and natural elements.', (SELECT id FROM themes WHERE name = 'Tropical'), 2300000),
    ('5049d2c6-9df0-4d3d-9d18-ddc63beb408e', '3b16c9f5-b64a-4b3e-8c5e-bd94f5f48a3a', 'Asian Retreat Home', 'A modern tropical retreat home design that offers a peaceful and serene environment.', (SELECT id FROM themes WHERE name = 'Tropical'), 2400000),
    ('6049d2c6-9df0-4d3d-9d18-ddc63beb408e', '4b21f7c4-8de5-44db-9b13-81b3e20fc3d0', 'Traditional Manor Home', 'A modern traditional manor home design with classic architectural details and timeless elegance.', (SELECT id FROM themes WHERE name = 'Traditional'), 2500000),
    ('7049d2c6-9df0-4d3d-9d18-ddc63beb408e', '5d8d4b55-41c3-4651-b2ff-68d7e0a1c2eb', 'Traditional Cottage Home', 'A modern traditional cottage home design with a cozy and charming atmosphere.', (SELECT id FROM themes WHERE name = 'Traditional'), 2600000),
    ('9049d2c6-9df0-4d3d-9d18-ddc63beb408e', '7d7b4e4b-5c0d-4733-bcb6-674e3b569b5c', 'Contemporary Loft Home', 'A modern contemporary loft home design with an open floor plan and industrial accents.', (SELECT id FROM themes WHERE name = 'Contemporary'), 2800000),
    ('0049d2c6-9df0-4d3d-9d18-ddc63beb408e', '8d8e6e77-6e18-4b2a-91c6-70b0e544b9df', 'Contemporary Penthouse Home', 'A modern contemporary penthouse home design with panoramic views and luxurious amenities.', (SELECT id FROM themes WHERE name = 'Contemporary'), 2900000),
    ('1049d2c6-9df0-4d3d-9d18-ddc63beb408e', '9e7e7b6e-7f3d-4d19-8bdf-7196a577fa36', 'Contemporary Townhouse Home', 'A modern contemporary townhouse home design with a sleek and modern aesthetic.', (SELECT id FROM themes WHERE name = 'Contemporary'), 3000000),
    ('2049d2c6-9df0-4d3d-9d18-ddc63beb408e', '1f9b9b7b-9f29-4d1f-9c69-92b4bcb4a0b6', 'Victorian Mansion Home', 'A modern victorian mansion home design with ornate details and grandeur.', (SELECT id FROM themes WHERE name = 'Victorian'), 3100000),
    ('3149d2c6-9df0-4d3d-9d18-ddc63beb408e', '2fa67d94-af88-4fa7-8d99-a327f9d7a38e', 'Victorian Cottage Home', 'A modern victorian cottage home design with charming features and a cozy atmosphere.', (SELECT id FROM themes WHERE name = 'Victorian'), 3200000),
    ('4249d2c6-9df0-4d3d-9d18-ddc63beb408e', '3f9c7d86-bfa8-47a6-a5df-b1b7f3b7bfa6', 'Victorian Townhouse Home', 'A modern victorian townhouse home design with elegant architecture and timeless style.', (SELECT id FROM themes WHERE name = 'Victorian'), 3300000);
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
    ('2cd443c1-157f-40c7-b4c1-c61ebe03af22', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
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
    ('9049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('0049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('1049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('2049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('3049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('4049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('5049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/portofolios/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('6049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/portofolios/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('7049d2c6-9df0-4d3d-9d18-ddc63beb408e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/portofolios/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
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
exports.down = (pgm) => {
    pgm.sql(`
    DELETE FROM portofolios
    WHERE id IN (
      '130ab61f-54e1-47df-8674-4b0ad473fc72',
      '25b18497-2552-47b6-a0dd-e50047fc70ed',
      '3765718c-f23a-46b3-a27d-7cb7d4b6590c',
      '41227778-659e-42e6-a0a6-2b8575b1f328',
      '5f79aa65-8f33-4f6e-a7c0-69e222d06fe8',
      '67ab02a5-2f88-4591-bb46-0dc491832d38',
      '732760dd-5373-4283-b22c-e4cadd110fb0',
      '87004559-d680-4c8e-aba0-b3e339303977',
      '9987dc75-ec65-422d-a9f3-4b1ccc2a4e87',
      '010112af-a82e-4048-b801-c799610e7eef',
      '144c9928-c1db-46ad-ae30-07b3b274effc',
      '2cd443c1-157f-40c7-b4c1-c61ebe03af22',
      '34e4e316-f33e-4875-8101-a8e640663f19',
      '40253382-d117-4916-8c8f-9f9033f6c1ff',
      '587282e6-a331-4a12-b5e5-bcdca2bc903d',
      '671a2a6c-5a7f-4e93-a7f5-1c7cb11024c0',
      '7b010534-f488-4891-b988-dd313d07e75c',
      '85b75f4e-1ee1-453b-9b08-94d8ab63f8dc',
      '90c9ab8c-870c-43e0-a1db-fe8653d9ab04',
      '0b61481d-4cfc-4080-972d-70b0af306492',
      '1238962b-ca4b-418e-afa3-8bcf40772064',
      '24f594a4-2c3f-46cd-b5cd-0ab80393480a',
      '35e3c1f3-2c7f-4f6e-8c2f-0c7b0f6e3a8d',
      '41c2f4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e',
      '54c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f',
      '64c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f',
      '74c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f',
      '9049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '0049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '1049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '2049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '3049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '4049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '5049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '6049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '7049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '9049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '0049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '1049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '2049d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '3149d2c6-9df0-4d3d-9d18-ddc63beb408e',
      '4249d2c6-9df0-4d3d-9d18-ddc63beb408e'
    );
  `);
};
