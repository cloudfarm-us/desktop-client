module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": "./",
    "ecmaVersion": 2020
  },
  "plugins": [
    "import",
    "@typescript-eslint",
    "arca"
  ],
  "extends": [
     "airbnb-base",
     "airbnb-typescript/base",
     "plugin:import/recommended",
     "plugin:import/typescript"
  ],
  rules: {
    
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    "no-console": "off",
    "no-void": "off",
    "max-len": "off",
    "quote-props": "off",
    "global-require": "off", 
    "import/prefer-default-export": "off",
    "import/no-unresolved":"off",
    "arca/curly": 2,
    "arca/import-absolutes": 0,
    "arca/import-align": 2,
    "arca/import-ordering": 2,
    "arca/melted-constructs": 2,
    "arca/newline-after-import-section": 2,
    "arca/no-default-export": 0,

    "arrow-body-style" : "off",
    "no-multi-spaces": "off",
    "key-spacing": [2, {
      "singleLine": {
        "beforeColon": false,
        "afterColon": true
      },
      "multiLine": {
        "beforeColon": true,
        "afterColon": true,
        "align": "colon"
      }
  }],
  
  "object-curly-newline": ["error", {
    "ObjectExpression": { "consistent": true },
    "ObjectPattern": { "consistent": true },
    "ImportDeclaration": { "consistent": true },
    "ExportDeclaration": { "consistent": true },
  }],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 1}]
  },
  
  settings: {
    'import/resolver': {
      node: {},
      "typescript": {}
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
