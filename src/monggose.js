const mongoose = require('mongoose')
require('dotenv').config()
const dbData = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  cluster: process.env.DB_CLUSTER,
  database: process.env.DB_DATABASE
}
module.exports = async function mongoConnect () {
  await mongoose.connect(
    `mongodb://${dbData.username}:${dbData.password}@${dbData.cluster}/${dbData.database}?ssl=true&replicaSet=atlas-t8e9i9-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
}
