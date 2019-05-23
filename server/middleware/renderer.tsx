import * as React from 'react'

import ReactDOMServer from 'react-dom/server'

import { App } from '../../src/App'

import { store } from '../../src/module'
import stats from '../../build/react-loadable.json';

import * as Loadable from 'react-loadable'
import { Provider } from "react-redux"
import { getBundles } from "react-loadable/webpack"

const path = require('path')
const fs = require('fs')

export default (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.log('err', err)
      return res.status(404).end()
    }

    const state = store.getState()
    const modulesArray = [];

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={m => {
        console.log('M', m)
        modulesArray.push(m as never)
      }}>
        <Provider store={store}>
          <App />
        </Provider>
      </Loadable.Capture>
    );

    console.log('MODULES', modulesArray);


    let bundles = getBundles(stats as any, modulesArray);
    console.log('BUNDLES', bundles)

    const bundleScripts = bundles.map(bundle => {
      console.log('BUNDLE', bundle)
      if (!bundle) return ''
      return `<script src="/build/static/js/${bundle.file}"></script>`
    }).join('\n')

    console.log('BUNDLE SCRIPTS', bundleScripts)


    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>
         <script>
           // WARNING: See the following for security issues around embedding JSON in HTML:
           // http://redux.js.org/recipes/ServerRendering.html#security-considerations
           window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
             /</g,
             '\\\u003c'
           )}
         </script>
         ${bundleScripts}
         `
      )
    )
  })
}