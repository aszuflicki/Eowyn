'use strict'
const { EventEmitter } = require('events')
const config = require('./config')
const repository = require('./repository/prices')
const mediator = new EventEmitter()
const crypto = require('./streaming/crypto')
const server = require('./server/server')

console.log('--- Auth Microservice ---')
console.log('Connecting to db...')

process.on('uncaughtException', (err) => {
	console.error('Unhandled Exception', err)
	process.exit(1)
})

process.on('uncaughtRejection', (err) => {
	console.error('Unhandled Rejection', err)
	process.exit(1)
})

mediator.on('db.ready', db => {
	console.log('Connected to db. Setting up repository...')

	repository.connect(db)
		.then(repo => {
			console.log('Connected to repository. Connecting to CryptoCompare API...')

			crypto.connect(repo)
			console.log('Connected to CryptoCompare API. Starting up server...')

			server.start({
				port: config.serverSettings.port,
				repo
			}).then(app => {
				crypto.serve(app)
				console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
			})
		})
})

mediator.on('db.error', err => {
	console.error('DB error', err)
	process.exit(1)
})

config.db.connect(config.dbSettings, mediator)

mediator.emit('boot.ready')
