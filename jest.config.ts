import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  moduleFileExtensions: ['js', 'ts', 'json'],

  preset: 'ts-jest',
  testEnvironment: 'node',

  // Root directory for Jest to look for tests
  roots: ['<rootDir>/apps/server/tests'],

  // Setup files after environment setup
  setupFilesAfterEnv: ['<rootDir>/apps/server/tests/setup.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        // Use the test-specific tsconfig to avoid rootDir issues
        tsconfig: '<rootDir>/apps/server/tsconfig.test.json',
      },
    ],
  },

  verbose: true,
};

export default config;
