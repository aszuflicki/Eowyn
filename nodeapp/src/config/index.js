const { dbSettings, serverSettings } = require('./config')
const db = require('./postgres')
const cors = require('./cors')
const authSettings = require('./auth')

module.exports = { dbSettings, serverSettings, db, cors, authSettings }
