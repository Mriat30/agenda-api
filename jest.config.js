module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};