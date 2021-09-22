module.exports = {
  root: true,
  extends: [
    '../../.eslintrc.js',
  ],
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off"
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
