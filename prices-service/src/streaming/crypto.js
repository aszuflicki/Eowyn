'use strict'
const ioClient = require('socket.io-client')
const io = require('socket.io')
let price
const connect = (rep) => {
	let socket = ioClient('https://streamer.cryptocompare.com/')
	var subscription = ['5~CCCAGG~BTC~USD']
	socket.emit('SubAdd', { subs: subscription })
	socket.on('m', function (message) {
		const msg = message.split('~')

		if (msg[0] === '5' && (msg[4] === '1' || msg[4] === '2')) {
			price = msg[5]
			if (price != null) {
				rep.addBTC(new Date(), price)
			}
		}
	})
}

const serve = (app) => {
	const server = io(app)
	server.on('connection', () => {
		setInterval(() => {
			server.emit('btc', { price, _time: new Date() })
		}, 100)
	})
}

module.exports = { connect, serve }
