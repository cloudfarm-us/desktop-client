module.exports = {
  env: {
    browser: true,
    node: false,
  },
  extends: [
    // 'xo-space/browser',
    // 'xo-react/space',
    '../../.eslintrc.js',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': [
    //   'warn',
    //   {
    //     additionalHooks: 'useRecoilCallback|useRecoilTransaction_UNSTABLE',
    //   },
    // ],
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
