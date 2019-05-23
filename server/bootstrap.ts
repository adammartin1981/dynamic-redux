// This is to read in TSX/JSX

import {} from 'react'

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Babel setup
require('@babel/register')({
  ignore: [/(node_modules)/],
  extensions: ['.ts', '.js', '.tsx', '.jsx'],
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'react-loadable/babel',
  ]
})

console.log('BRINGING IN INDEX')
require('./index')