// @ts-check

const alias = require('./tsconfig.alias').alias
/**@type {{[k:string]:string}} */
let moduleNameMapper = {}

for (let name in alias) {
  let dir = alias[name]
  moduleNameMapper[`^${name}(.*)$`] = `<rootDir>/${dir}$1`
}

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  testRegex: TEST_REGEX,
  testEnvironment: "node",
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverage: false,
  moduleNameMapper,
}
