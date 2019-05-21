import express from 'express'
import serverRenderer from './middleware/renderer'
import * as Loadable from 'react-loadable'

const PORT = 3000
// Import?
const path = require('path')

const app = express()

Loadable.preloadAll().then(() => {
  app.listen(PORT, () =>  console.log('LISTENING'))
})

app.use('/', serverRenderer)



