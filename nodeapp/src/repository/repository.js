'use strict'
const models = require('../models/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op



const repository = ({ user, dashboard, settings, layout, tabs }) => {
	const getUserByEmail = email => {
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

	const getLayoutByEmail = (email, no = 0) => {
		return new Promise((resolve, reject) => {
			layout
				.findAll({
					where: {
						email, no
					}
				})
				.then(result => {
					resolve(result[0].dataValues.layout)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	const getAllLayoutsByEmail = (email) => {
		return new Promise((resolve, reject) => {
			layout
				.findAll({
					where: {
						email
					}
				})
				.then(result => {
					let out = {};
					result.forEach(el => out[el.dataValues.id + ""] = el.dataValues.layout)
					resolve(out)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	const getSettingsByEmail = (email, no = 0) => {
		return new Promise((resolve, reject) => {
			settings
				.findAll({
					where: {
						email, no
					}
				})
				.then(result => {
					resolve(result[0].dataValues.settings)
				})
				.catch(err => {
					reject(err)
				})
		})
	}



	const getTabsByEmail = email => {
		return new Promise((resolve, reject) => {
			tabs
				.findAll({
					where: {
						email
					}
				})
				.then(result => {
					resolve(result[0].dataValues.tabs)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	const createStandardDashboard = (email) => {
		return new Promise((resolve, reject) => {
			Promise
				.all([
					dashboard.upsert({ email, layout: standardLayout, settings: standadSettings }),
					settings.upsert({ email, no: 0, settings: standadSettings }),
					settings.upsert({ email, no: 1, settings: standadSettings }),

					layout.upsert({ email, no: 0, layout: standardLayout }),
					layout.upsert({ email, no: 1, layout: standardLayout }),

					tabs.upsert({ email, tabs: standardTabs }),
				])
				.then((...values) => resolve(values))
		})
	}

	const updateDashboardLayout = (email, layout_, no = 0) => {
		return new Promise((resolve, reject) => {
			console.log()
			Promise
				.all([
					dashboard.upsert({ email, layout }),
					layout.update({ email, no, layout: layout_ }, { where: { email, no } }),
				])
				.then(results => resolve(results))
		})
	}

	const updateDashboardSettings = (email, settings_, no = 0) => {
		return new Promise((resolve, reject) => {
			Promise
				.all([
					dashboard.upsert({ email, settings: settings_ }),
					settings.update({ email, no, settings: settings_ }, { where: { email, no } }),
				])
				.then(results => resolve(results))
		})
	}

	return {
		getUserByEmail,
		addUser,
		getDashboardByEmail,
		updateDashboardLayout,
		updateDashboardSettings,
		createStandardDashboard,
		getLayoutByEmail,
		getSettingsByEmail,
		getTabsByEmail,
		getAllLayoutsByEmail
	}
}

const initModels = sequelize => {
	return new Promise((resolve, reject) => {
		const User = models.User(sequelize, Sequelize)
		const Dashboard = models.Dashboard(sequelize, Sequelize)
		const Settings = models.Settings(sequelize, Sequelize)
		const Layout = models.Layout(sequelize, Sequelize)
		const Tabs = models.Tabs(sequelize, Sequelize)

		Promise.all([
			User.sync({ force: false }),
			Dashboard.sync({ force: false }),
			Settings.sync({ force: false }),
			Layout.sync({ force: false }),
			Tabs.sync({ force: false }),
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
			([user, dashboard, settings, layout, tabs]) => {
				resolve(repository({ user, dashboard, settings, layout, tabs }))
			}
		).catch(e => reject(e))
	})
}

module.exports = { connect }


const standardTabs = [
	{ name: 'Tab1' },
	{ name: 'Tab2' }
]

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
		settings: {
			tabs: [
				{
					title: "Indeksssy xd",
					symbols: [{ s: "INDEX:SPX", d: "S&P 500" }, { s: "INDEX:IUXX", d: "Nasdaq 100" }]
				},
				{
					title: "Towary",
					symbols: [{ s: "CME_MINI:ES1!", d: "E-Mini S&P" }, { s: "CME:E61!", d: "Euro" }]
				}]
		}

	},
	"3": {
		type: 3,
		settings: {
			symbol: {
				value: "BITFINEX:ETHUSD"
			}
		}

	},
	"4": {
		type: 4,
		settings: {
			symbol: {
				value: "BITFINEX:ETHUSD"
			}
		}

	},
	"5": {
		type: 5,

	},

}
