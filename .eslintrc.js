module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    '@react-native-community',
    'eslint:recommended',
    '@react-native',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-native', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
  },
  env: {
    'react-native/react-native': true,
    jest: true,
  },
  babelOptions: {
    presets: ['module:metro-react-native-babel-preset'], // 👈 RN preset
    plugins: ['@babel/plugin-syntax-jsx'], // 👈 explicitly enable JSX syntax
  },
  parserOptions: {
    requireConfigFile: false, // don’t force ESLint to look for Babel config
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
