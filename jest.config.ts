// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  moduleFileExtensions: ['js', 'ts', 'json'],

  preset: 'ts-jest',
  testEnvironment: 'node',

  roots: ['<rootDir>/apps/server/tests'],

  setupFilesAfterEnv: ['<rootDir>/apps/server/tests/setup.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/apps/server/tsconfig.json',
      },
    ],
  },

  verbose: true,
};

export default config;
