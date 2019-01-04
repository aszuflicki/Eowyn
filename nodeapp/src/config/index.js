const { dbSettings, serverSettings } = require('./config')
const db = require('./postgres')
const cors = require('./cors')

module.exports = Object.assign({}, { dbSettings, serverSettings, db, cors })
