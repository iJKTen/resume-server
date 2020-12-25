'use strict';

module.exports = {
    extends: ['eslint:recommended', 'google'],
    env: {
        jest: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        'comma-dangle': ['error', 'never'],
        'prefer-template': 'error',
        'complexity': ['error', 50],
        'max-len': ['error', { code: 120 }],
        'no-else-return': [1, { 'allowElseIf': false }],
        'indent': ['error', 4],
        'object-curly-spacing': 0,
        'space-before-function-paren': ['error', 'always']
    }
};