module.exports = {
  testEnvironment: 'jsdom',
  verbose: false,
  testTimeout: 30000,
  slowTestThreshold: 30,
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 80,
      statements: 0
    }
  },
  transform: {
    '^.+\\.svg$': 'jest-transform-stub',
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
