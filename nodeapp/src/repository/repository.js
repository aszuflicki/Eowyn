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
		updateDashboardSettings
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
			([user]) => {
				resolve(repository({ user }))
			}
		).catch(e => reject(e))
	})
}

module.exports = { connect }
