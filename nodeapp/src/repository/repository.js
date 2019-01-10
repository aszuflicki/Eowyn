'use strict'
const models = require('../models/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op



const repository = ({ user, dashboard }) => {
	const getUserByEmail = email => {
		console.log(email)
		return new Promise((resolve, reject) => {
			user
				.findAll({
					where: {
						email
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

	const addUser = (email, pass) => {
		return new Promise((resolve, reject) => {
			user.create({ email, pass })
				.then(() =>
					user.findOrCreate({ where: { email, pass } })
				)
				.spread((user, created) => {
					resolve({ user, created })
				})
		})
	}

	const getDashboardByEmail = email => {
		return new Promise((resolve, reject) => {
			dashboard
				.findAll({
					where: {
						email
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

	const createStandardDashboard = (email) => {
		return new Promise((resolve, reject) => {
			dashboard.upsert({ email, layout: standardLayout, settings: standadSettings })
				.then(() =>
					dashboard.findOrCreate({ where: { email } })
				)
				.spread((dashboard, created) => {
					resolve({ dashboard, created })
				})
		})
	}

	const updateDashboardLayout = (email, layout) => {
		return new Promise((resolve, reject) => {
			dashboard.upsert({ email, layout })
				.then(() =>
					dashboard.findOrCreate({ where: { email } })
				)
				.spread((dashboard, created) => {
					resolve({ dashboard, created })
				})
		})
	}

	const updateDashboardSettings = (email, settings) => {
		return new Promise((resolve, reject) => {
			dashboard.upsert({ email, settings })
				.then(() =>
					dashboard.findOrCreate({ where: { email } })
				)
				.spread((dashboard, created) => {
					resolve({ dashboard, created })
				})
		})
	}

	return {
		getUserByEmail,
		addUser,
		getDashboardByEmail,
		updateDashboardLayout,
		updateDashboardSettings,
		createStandardDashboard
	}
}

const initModels = sequelize => {
	return new Promise((resolve, reject) => {
		const User = models.User(sequelize, Sequelize)
		const Dashboard = models.Dashboard(sequelize, Sequelize)

		Promise.all([
			User.sync({ force: false }),
			Dashboard.sync({ force: false })
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
			([user, dashboard]) => {
				resolve(repository({ user, dashboard }))
			}
		).catch(e => reject(e))
	})
}

module.exports = { connect }


const standardLayout = [
	{
		h: 10,
		w: 6,
		i: "0",
		x: 0,
		y: 0
	},
	{

		h: 10,
		w: 6,
		i: "1",
		x: 6,
		y: 0
	},
	{

		h: 10,
		w: 6,
		i: "2",
		x: 0,
		y: 10
	},
	{
		h: 3,
		w: 4,
		i: "3",
		x: 6,
		y: 10
	},
	{
		h: 10,
		w: 6,
		i: "4",
		x: 0,
		y: 20
	},
	{
		h: 3,
		w: 3,
		i: "5",
		x: 6,
		y: 20
	},
]

const standadSettings = {
	"0": {
		type: 0,
		settings: {
			symbol: { value: "BITFINEX:ETHUSD" }
		}
	},
	"1": {
		type: 1,

	},
	"2": {
		type: 2,

	},
	"3": {
		type: 3,

	},
	"4": {
		type: 4,

	},
	"5": {
		type: 5,

	},

}
