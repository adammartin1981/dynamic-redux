// import {ReactLoadablePlugin} from "react-loadable/webpack";
//
// const plugin1 = new ReactLoadablePlugin({
//   filename: './dist/react-loadable.json'
// })

export const config = {
  ignore: [ /(node_modules)/ ],
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
};
