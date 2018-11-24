const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const proxy = require('http-proxy-middleware')
const start = (options) => {
	return new Promise((resolve, reject) => {
		if (!options.routes) {
			reject(new Error('The server must be started with a discovered routes'))
		}
		if (!options.port) {
			reject(new Error('The server must be started with an available port'))
		}

		const app = express()
		app.use(morgan('dev'))
		app.use(helmet())

		options.routes.forEach(el => {
			const { route, port } = el
			console.log(route + '     ' + port)
			app.use(route, proxy({
				target: `http://192.168.99.100:${port}`,
				changeOrigin: true
			}))
		})

		const server = app.listen(options.port, () => resolve(server))
	})
}

module.exports = { start }
