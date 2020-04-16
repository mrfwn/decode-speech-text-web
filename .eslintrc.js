module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'react/no-access-state-in-setstate': 'off',
    'react/destructuring-assignment': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/forbid-prop-types': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'react/require-default-props': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error',{ extensions: ['.jsx','.js']}],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': [1, 'never'],
    'react/jsx-props-no-spreading': 'off',
    'react/static-property-placement': [1],
  },
};
