'use strict'
const { EventEmitter } = require('events')

const mediator = new EventEmitter()

console.log('--- Prices Microservice ---')

process.on('uncaughtException', (err) => {
	console.error('Unhandled Exception', err)
	process.exit(1)
})

process.on('uncaughtRejection', (err) => {
	console.error('Unhandled Rejection', err)
	process.exit(1)
})

mediator.emit('boot.ready')
