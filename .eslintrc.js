module.exports = {
  root          : true,
  parser        : '@typescript-eslint/parser',
  parserOptions : {
    project         : './tsconfig.json',
    tsconfigRootDir : './',
    ecmaVersion     : 2020,
  },
  plugins : ['import', '@typescript-eslint', 'arca'],
  extends : [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules : {
    'arca/newline-after-import-section' : 0,
    'import/no-extraneous-dependencies' : 0,
    'no-console'                        : 0,
    'no-void'                           : 0,
    'max-len'                           : 0,
    'quote-props'                       : 0,
    'global-require'                    : 0,
    'import/prefer-default-export'      : 0,
    'import/no-unresolved'              : 0,
    'arca/curly'                        : 2,
    'arca/import-align'                 : 2,
    'arca/import-ordering'              : 2,
    'arca/no-default-export'            : 0,
    'arrow-body-style'                  : 'off',
    'no-multi-spaces'                   : 'off',
    'key-spacing'                       : [
      2,
      {
        singleLine : {
          beforeColon : false,
          afterColon  : true,
        },
        multiLine : {
          beforeColon : true,
          afterColon  : true,
          align       : 'colon',
        },
      },
    ],

    'object-curly-newline' : [
      'error',
      {
        ObjectExpression  : { consistent: true },
        ObjectPattern     : { consistent: true },
        ImportDeclaration : { consistent: true },
        ExportDeclaration : { consistent: true },
      },
    ],
    'no-multiple-empty-lines' : ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
  },

  settings : {
    'import/resolver' : {
      node       : {},
      typescript : {},
    },
    'import/parsers' : {
      '@typescript-eslint/parser' : ['.ts', '.tsx'],
    },
  },
};
