const express = require('express')
const routes = require('./routes.js')
const useragent = require('express-useragent')

module.exports = function mainApp (port) {
  const app = express()
  app.use(express.json())
  app.use(useragent.express())
  app.use(express.urlencoded({ extended: true }))
  app.use(routes())
  app.listen(port, () => console.log(`this app run at port:${port}`))
}
