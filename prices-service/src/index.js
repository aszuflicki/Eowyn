'use strict'
const { EventEmitter } = require('events')
const config = require('./config')
const mediator = new EventEmitter()

console.log('--- Prices Microservice ---')
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
    console.log('Connected to db. Connecting to Crypto API...')

})

mediator.on('db.error', err => {
    console.error('DB error', err)
    process.exit(1)
})


config.db.connect(config.dbSettings, mediator)

mediator.emit('boot.ready')