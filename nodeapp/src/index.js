'use strict'
const { EventEmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/')
const mediator = new EventEmitter()

console.log('--- Main service ---')
console.log('Connecting to repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
  process.exit(1)
})

process.on('uncaughtRejection', (err) => {
  console.error('Unhandled Rejection', err)
  process.exit(1)
})

let postgres

mediator.on('postgres.ready', postgres => {
  repository.connect(postgres)
    .then(repo => {
      console.log('Connected. Starting Server...')
      return server.start({
        port: config.serverSettings.port,
        repo
      })
    })
    .then(() => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
    })
})

mediator.on('db.error', err => {
  console.error(err)
  process.exit(1)
})

config.postgres.connect(config.dbSettings, mediator)

mediator.emit('boot.ready')
