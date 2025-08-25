module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: ['eslint:recommended','plugin:@typescript-eslint/recommended','plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['dist'],
  rules: { '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }] }
}
