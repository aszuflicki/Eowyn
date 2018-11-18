'use strict'
const express = require('express')
const api = require('../api/prices')

const start = async (options) => {
	const app = express()

	api(app, options)

	let server = await app.listen(options.port, () => app)
	return server
}

module.exports = { start }
