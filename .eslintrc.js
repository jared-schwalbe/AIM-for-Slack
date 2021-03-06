module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    chrome: 'readonly',
  },
  extends: ['react-app'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 'off',
    "import/no-anonymous-default-export": 'off',
  },
};
