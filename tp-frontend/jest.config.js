module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testMatch: ['**/log-in.component.spec.ts', '**/another-test.spec.ts']
};

//testMatch: ['**/log-in.component.spec.ts', '**/another-test.spec.ts'],