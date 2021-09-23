module.exports = {
  env : {
    browser : true,
    node    : true,
  },
  extends : [
    '../../.eslintrc.js',
  ],
  rules : {
    'react/react-in-jsx-scope' : 'off',
  },
  parserOptions : {
    tsconfigRootDir : __dirname,
    project         : './tsconfig.json',
  },
};
