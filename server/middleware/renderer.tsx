import * as React from 'react'

import ReactDOMServer from 'react-dom/server'

import { App } from '../../src/App'

import { store } from '../../src/module'
import * as Loadable from 'react-loadable'
import { Provider } from "react-redux"
import { getBundles } from "react-loadable/webpack"

const path = require('path')
const fs = require('fs')

export default (req, res, next) => {
  console.log('HERE')
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.log('err', err)
      return res.status(404).end()
    }

    const state = store.getState()

    //
    // const html = ReactDOMServer.renderToString(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // )


    const modulesArray = [];

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={m => {
        console.log('M', m)
        console.log('ARRAY', modulesArray)
        modulesArray.push(m as never)
        // modulesArray.push(m)
      }}>
        <Provider store={store}>
          <App />
        </Provider>
      </Loadable.Capture>
    );

    console.log('MODULES', modulesArray);
    // const html = ReactDOMServer.renderToString(<p>Foo</p>)

    // let bundles = getBundles(stats, modulesArray)

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
         </script>`
      )
    )
  })
}