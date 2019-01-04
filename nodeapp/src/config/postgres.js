'use strict'
const Sequelize = require('sequelize')

const getURI = options => {
	const { user, pass, url, port, dbname } = options
	return `postgres://${user}:${pass}@${url}:${port}/${dbname}`
}

const connect = (options, mediator) => {
	mediator.once('boot.ready', () => {
		const URI = getURI(options)
		const sequelize = new Sequelize(URI, options.opts)

		sequelize
			.authenticate()
			.then(() => {
				console.log('xd')
				mediator.emit('db.ready', sequelize)
			})
			.catch(err => {
				console.log(err)
				mediator.emit('db.err', err)
			})
	})
}

module.exports = { connect }
