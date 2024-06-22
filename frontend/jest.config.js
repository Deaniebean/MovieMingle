// frontend/jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/mocks/fileMock.js'
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.svg$': 'jest-svg-transformer',
      },
  };
  