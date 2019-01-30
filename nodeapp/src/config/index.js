const { dbSettings, serverSettings } = require('./config')
const postgres = require('./postgres')
const rethinkdb = require('./rethinkdb')
const cors = require('./cors')
const authSettings = require('./auth')

module.exports = { dbSettings, serverSettings, postgres, rethinkdb, cors, authSettings }
