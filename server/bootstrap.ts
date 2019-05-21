// This is to read in TSX/JSX

import ignoreStyles from 'ignore-styles'

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
    // new ReactLoadablePlugin({
    //   filename: './dist/react-loadable.json',
    // }),
  ]
})

console.log('BRINGING IN INDEX')
require('./index')