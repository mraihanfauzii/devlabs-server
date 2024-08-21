/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
};

module.exports = config;
