module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  globalSetup: '<rootDir>/tests/global-setup.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};