const app = require('./src/app')
const mongoConnect = require('./src/monggose')
require('dotenv').config();

(async () => {
  try {
    await mongoConnect()
    app(process.env.PORT || 3000)
  } catch (error) {
    console.log(error)
    console.log('error:app cannot running')
  }
})()
