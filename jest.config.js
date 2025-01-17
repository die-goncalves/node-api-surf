const { resolve } = require('path');
const root = resolve(__dirname); //diretório atual deste arquivo
module.exports = {
  rootDir: root,
  displayName: 'root-tests', //label para os testes
  testMatch: ['<rootDir>/src/**/*.test.ts'], //testes de unidade ficam dentro de src, e testes funcionais end-to-end ficam dentro de __test__ fora do source
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@__test__/(.*)': '<rootDir>/__test__/$1',
  },
};