module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '../../.eslintrc.js',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
