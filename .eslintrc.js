module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    eqeqeq: 2,
    semi: 'error',
    'linebreak-style': ['error', 'unix'],
    'max-len': [2, { code: 120, ignoreUrls: true }],
    'arrow-body-style': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'no-console': 2,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'react/require-default-props': 0,
    'react/static-property-placement': 0,
    'react/jsx-filename-extension': 0,
    'react/no-unescaped-entities': 0,
    'react/forbid-prop-types': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/heading-has-content': 0,
    'lines-between-class-members': ['error', 'always'],
    '@typescript-eslint/no-empty-interface': 0,
    'react/prop-types': 0,

    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    // '@typescript-eslint/interface-name-prefix': [2, 'always'],
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'react/prefer-stateless-function': 0,

    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['block', 'class', 'export'],
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: ['*'],
        next: ['return'],
      },
    ],
    'jsx-a11y/click-events-have-key-events': 0,
  },
  globals: {
    describe: true,
    test: true,
    expect: true,
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    afterEach: true,
    FileReader: true,
    window: true,
    document: true,
    localStorage: true,
  },
  env: {
    jest: true,
  },
};