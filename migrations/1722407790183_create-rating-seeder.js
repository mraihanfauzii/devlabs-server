/* eslint-disable max-len */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Insert seed data into the ratings table
  pgm.sql(`
    INSERT INTO ratings (id, rater_id, ratee_id, rating, description)
    VALUES
    ('90618859-0da7-49f3-bf12-1e2f52ad7428', 'c5d4c4c9-2c4c-4c4c-9c4c-4c4c4c4c4c4c', '7d492cd4-0c82-45f9-a72c-539d8d553b42', 5, 'John Doe is a great architect!'),
    ('3b4d03a2-e9d5-42d0-8aca-54722b8a0f75', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4d', '7d492cd4-0c82-45f9-a72c-539d8d553b42', 4, 'John Doe is a good architect.'),
    ('3878e592-d240-452d-8bfc-67cdb21d7d18', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', '7d492cd4-0c82-45f9-a72c-539d8d553b42', 3, 'John Doe is an average architect.'),
    ('fb9b0c4a-ed3b-43eb-958b-e05012697d0a', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f', '7d492cd4-0c82-45f9-a72c-539d8d553b42', 2, 'John Doe is a bad architect.'),
    ('fb06114d-dcfd-4e0d-b218-0ae25e42139e', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f', '7d492cd4-0c82-45f9-a72c-539d8d553b42', 1, 'John Doe is a terrible architect.'),
    ('d6c469de-f420-4f75-8f3a-cf8d720c7a79', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c', 5, 'Alex Johnson designed my dream home!'),
    ('c73a0a19-945b-4c02-8c3d-8a4a75127d84', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 4, 'Michael Williams has an eye for detail.'),
    ('a7d8aef8-9d4d-4a1b-839c-2d9cfcc37455', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c5f', 3, 'David Miller''s designs are sustainable but need more creativity.'),
    ('c918a82f-0d2a-41b6-8320-e7c9a2c3f1ab', 'c5d4c4c9-2c4c-4c4c-9c4c-4c4c4c4c4c4c', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c5f', 5, 'David Miller created an amazing eco-friendly home for us!'),
    ('2e8d19fc-8f3b-4a34-a638-c6d4d9b1e7bc', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 4, 'Chris Moore designed a contemporary home that we love.'),
    ('5315f2c6-4b29-49d9-bc47-3a0a4749c073', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c', 3, 'Alex Johnson is an average architect.'),
    ('7f214594-d739-42de-86f0-b75a2a5d20e1', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c', 4, 'Alex Johnson has a great vision for eco-friendly designs.'),
    ('2d3c4393-004b-4e96-87ad-9f33d8e4dc0e', 'c5d4c4c9-2c4c-4c4c-9c4c-4c4c4c4c4c4c', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c5f', 5, 'David Miller''s minimalist designs are exactly what we wanted.'),
    ('7b042b5e-f3d8-4ae3-8349-2f8f90c4d1bc', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 2, 'Michael Williams'' designs lacked innovation.'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 1, 'Michael Williams is a terrible architect.'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 3, 'Michael Williams is an average architect.'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 4, 'Chris Moore is a good architect.'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4e', 'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 5, 'Chris Moore is a great architect.');
  `);
  // Insert seed data into the rating attachments table
  pgm.sql(`
    INSERT INTO rating_attachments (rating_id, name, path)
    VALUES
    ('90618859-0da7-49f3-bf12-1e2f52ad7428', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('90618859-0da7-49f3-bf12-1e2f52ad7428', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('90618859-0da7-49f3-bf12-1e2f52ad7428', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('3b4d03a2-e9d5-42d0-8aca-54722b8a0f75', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('3b4d03a2-e9d5-42d0-8aca-54722b8a0f75', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('3b4d03a2-e9d5-42d0-8aca-54722b8a0f75', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('3878e592-d240-452d-8bfc-67cdb21d7d18', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('3878e592-d240-452d-8bfc-67cdb21d7d18', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('3878e592-d240-452d-8bfc-67cdb21d7d18', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('fb9b0c4a-ed3b-43eb-958b-e05012697d0a', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('fb9b0c4a-ed3b-43eb-958b-e05012697d0a', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('fb9b0c4a-ed3b-43eb-958b-e05012697d0a', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('fb06114d-dcfd-4e0d-b218-0ae25e42139e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('fb06114d-dcfd-4e0d-b218-0ae25e42139e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('fb06114d-dcfd-4e0d-b218-0ae25e42139e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('d6c469de-f420-4f75-8f3a-cf8d720c7a79', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('d6c469de-f420-4f75-8f3a-cf8d720c7a79', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('d6c469de-f420-4f75-8f3a-cf8d720c7a79', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('c73a0a19-945b-4c02-8c3d-8a4a75127d84', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('c73a0a19-945b-4c02-8c3d-8a4a75127d84', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('c73a0a19-945b-4c02-8c3d-8a4a75127d84', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('a7d8aef8-9d4d-4a1b-839c-2d9cfcc37455', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('a7d8aef8-9d4d-4a1b-839c-2d9cfcc37455', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('a7d8aef8-9d4d-4a1b-839c-2d9cfcc37455', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('c918a82f-0d2a-41b6-8320-e7c9a2c3f1ab', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('c918a82f-0d2a-41b6-8320-e7c9a2c3f1ab', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('c918a82f-0d2a-41b6-8320-e7c9a2c3f1ab', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('2e8d19fc-8f3b-4a34-a638-c6d4d9b1e7bc', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('2e8d19fc-8f3b-4a34-a638-c6d4d9b1e7bc', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('2e8d19fc-8f3b-4a34-a638-c6d4d9b1e7bc', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('5315f2c6-4b29-49d9-bc47-3a0a4749c073', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('5315f2c6-4b29-49d9-bc47-3a0a4749c073', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('5315f2c6-4b29-49d9-bc47-3a0a4749c073', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('7f214594-d739-42de-86f0-b75a2a5d20e1', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('7f214594-d739-42de-86f0-b75a2a5d20e1', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('7f214594-d739-42de-86f0-b75a2a5d20e1', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('2d3c4393-004b-4e96-87ad-9f33d8e4dc0e', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('2d3c4393-004b-4e96-87ad-9f33d8e4dc0e', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('2d3c4393-004b-4e96-87ad-9f33d8e4dc0e', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('7b042b5e-f3d8-4ae3-8349-2f8f90c4d1bc', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('7b042b5e-f3d8-4ae3-8349-2f8f90c4d1bc', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('7b042b5e-f3d8-4ae3-8349-2f8f90c4d1bc', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f', 'empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg', '/api/v1/ratings/attachments/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f', 'depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg', '/api/v1/ratings/attachments/depositphotos_494372922-stock-photo-mock-poster-frame-modern-interior.jpg'),
    ('f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f', 'depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg', '/api/v1/ratings/attachments/depositphotos_77665932-stock-photo-large-modern-house-with-stone.jpg'); 
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`
    DELETE FROM ratings
    WHERE id IN (
      '90618859-0da7-49f3-bf12-1e2f52ad7428',
      '3b4d03a2-e9d5-42d0-8aca-54722b8a0f75',
      '3878e592-d240-452d-8bfc-67cdb21d7d18',
      'fb9b0c4a-ed3b-43eb-958b-e05012697d0a',
      'fb06114d-dcfd-4e0d-b218-0ae25e42139e',
      'd6c469de-f420-4f75-8f3a-cf8d720c7a79',
      'c73a0a19-945b-4c02-8c3d-8a4a75127d84',
      'a7d8aef8-9d4d-4a1b-839c-2d9cfcc37455',
      'c918a82f-0d2a-41b6-8320-e7c9a2c3f1ab',
      '2e8d19fc-8f3b-4a34-a638-c6d4d9b1e7bc',
      '5315f2c6-4b29-49d9-bc47-3a0a4749c073',
      '7f214594-d739-42de-86f0-b75a2a5d20e1',
      '2d3c4393-004b-4e96-87ad-9f33d8e4dc0e',
      '7b042b5e-f3d8-4ae3-8349-2f8f90c4d1bc',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c4f',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c6f',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c7f',
      'f4c4c4c4-4c4c-4c4c-4c4c-4c4c4c4c4c8f'
    );
  `);
};
