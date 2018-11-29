'use strict'
const models = require('../models/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const ONE_HOUR = 60 * 60 * 1000

const repository = ({ BTC }) => {
	const getBTC = (from = new Date(), to = new Date(new Date() - ONE_HOUR)) => {
		console.log(from)
		console.log(to)
		return new Promise((resolve, reject) => {
			BTC
				.findAll({
					where: {
						_time: {
							[Op.between]: [to, from]
						}
					}
				})
				.then(result => {
					resolve(result)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	const addBTC = (_time, price) => {
		return new Promise((resolve, reject) => {
			BTC.create({ _time, price })
				.then(() =>
					BTC.findOrCreate({ where: { _time, price } })
				)
				.spread((btc, created) => {
					resolve({ btc, created })
				})
		})
	}

	return {
		getBTC,
		addBTC
	}
}

const initModels = sequelize => {
	return new Promise((resolve, reject) => {
		const BTC = models.BTC(sequelize, Sequelize)

		Promise.all([
			BTC.sync({ force: false })
		]).then((values) => {
			resolve(values)
		}).catch(e => reject(e))
	})
}

const connect = sequelize => {
	return new Promise((resolve, reject) => {
		if (!sequelize) {
			reject(new Error('Sequelize not supplied'))
		}
		initModels(sequelize).then(
			([BTC]) => {
				resolve(repository({ BTC }))
			}
		).catch(e => reject(e))
	})
}

module.exports = { connect }
