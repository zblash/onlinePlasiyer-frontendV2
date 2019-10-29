const closedRules = {
  'no-use-before-define': 0,
  'no-unused-vars': 0,
  'react/destructuring-assignment': 0,
  'react/jsx-wrap-multilines': 0,
  '@typescript-eslint/explicit-member-accessibility': 0,
  'react-hooks/exhaustive-deps': 0,
  'no-plusplus': 0,
  '@typescript-eslint/explicit-function-return-type': 0,
  '@typescript-eslint/interface-name-prefix': 0,
  'react/jsx-props-no-spreading': 0,
  'react/jsx-one-expression-per-line': 0,
  'arrow-body-style': 0,
  'import/no-unresolved': 0,
  'import/prefer-default-export': 0,
  'no-underscore-dangle': 0,
  'class-methods-use-this': 0,
  'react/require-default-props': 0,
  'react/static-property-placement': 0,
  'react/jsx-filename-extension': 0,
  'react/no-unescaped-entities': 0,
  'react/forbid-prop-types': 0,
  'jsx-a11y/label-has-associated-control': 0,
  'jsx-a11y/no-noninteractive-element-interactions': 0,
  'jsx-a11y/heading-has-content': 0,
  '@typescript-eslint/no-empty-interface': 0,
  'react/prop-types': 0,
  'jsx-a11y/click-events-have-key-events': 0,
};
const errorRules = {
  eqeqeq: 2,
  semi: 2,
  'no-console': 2,
  '@typescript-eslint/no-unused-vars': 2,
  'linebreak-style': [2, 'unix'],
  'max-len': [2, { code: 120, ignoreUrls: true }],
  'no-multiple-empty-lines': [2, { max: 1 }],
  'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  'lines-between-class-members': [2, 'always'],
  '@typescript-eslint/no-explicit-any': 2,
  'react/prefer-stateless-function': 2,
  'padding-line-between-statements': [
    2,
    { blankLine: 'always', prev: '*', next: ['block', 'class', 'export'] },
    { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    { blankLine: 'always', prev: ['*'], next: ['return'] },
  ],
};

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
    ...closedRules,
    ...errorRules,
    '@typescript-eslint/no-explicit-any': 0,
    'react/no-array-index-key': 0,
    'max-classes-per-file': 0,
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
  env: { jest: true },
};
