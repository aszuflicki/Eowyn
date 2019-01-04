'use strict'
const models = require('../models/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op



const repository = ({ user }) => {
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

	return {
		getUserByEmail,
		addUser
	}
}

const initModels = sequelize => {
	return new Promise((resolve, reject) => {
		const User = models.User(sequelize, Sequelize)

		Promise.all([
			User.sync({ force: false })
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
