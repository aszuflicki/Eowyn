const { serverSettings, dbSettings } = require('./config')
const db = require('./postgres')

module.exports = { serverSettings, dbSettings, db }