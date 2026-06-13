import { register } from 'tsconfig-paths';

register({
  baseUrl: './',
  paths: {
    '@pages': ['src/pages'],
    '@components': ['src/components'],
    '@ui': ['src/components/ui'],
    '@ui-pages': ['src/components/ui/pages'],
    '@utils-types': ['src/utils/types'],
    '@api': ['src/utils'],
    '@slices': ['src/services/slices'],
    '@selectors': ['src/services/selectors']
  }
});

export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json'
      }
    ]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|otf|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  testMatch: ['<rootDir>/**/(*.)+(spec|test).[tj]s?(x)'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/' // Игнорируем папку с Playwright‑тестами
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
};
