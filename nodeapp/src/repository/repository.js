'use strict'
const models = require('../models/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { notifyNewPost } = require('../api/socket')


const repository = ({ user, settings, layout, discussion, post, follower }) => {
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

	const getLayoutByEmail = (email) => {
		return new Promise((resolve, reject) => {
			layout
				.findAll({
					where: {
						email
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

	const getSettingsByEmail = (email, no = 0) => {
		return new Promise((resolve, reject) => {
			settings
				.findAll({
					where: {
						email
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

	const createStandardDashboard = (email) => {
		return new Promise((resolve, reject) => {
			Promise
				.all([
					settings.upsert({ email, settings: standadSettings }),
					layout.upsert({ email, layout: standardLayout }),
				])
				.then((...values) => resolve(values))
		})
	}

	const updateLayout = (email, layout_) => {
		return new Promise((resolve, reject) => {
			console.log()
			Promise
				.all([
					layout.update({ email, layout: layout_ }, { where: { email } }),
				])
				.then(results => resolve(results))
		})
	}

	const updateSettings = (email, settings_) => {
		return new Promise((resolve, reject) => {
			Promise
				.all([
					settings.update({ email, settings: settings_ }, { where: { email } }),
				])
				.then(results => resolve(results))
		})
	}

	const newDisscusion = (email, category, topic, desc) => {
		return new Promise((resolve, reject) => {
			Promise
				.all([
					discussion.create({ category, topic, desc, author: email, created: new Date(), answeared: new Date() }),
				])
				.then(results => resolve(results[0].dataValues))
		})
	}

	const getDisscusions = (category) => {
		return new Promise((resolve, reject) => {
			let params = {
				limit: 20,
				order: [['answeared', 'DESC']]
			}
			if (category) params['where'] = { category }

			Promise
				.all([
					discussion.findAll(params),
				])
				.then(results => {
					resolve(results[0].map(el => el.dataValues))
				})
		})
	}

	const getDisscusion = (id) => {
		return new Promise((resolve, reject) => {

			Promise
				.all([
					discussion.findOne({ where: { id } }),
					post.findAll({ where: { topic_id: id }, order: [['created', 'DESC']], limit: 20 }),
				])
				.then(results => {
					// console.log(results)
					resolve({
						discussion: results[0].dataValues,
						posts: results[1].map(el => el.dataValues) || []
					})
				})
		})
	}

	const newPost = (author, topic_id, comment) => {
		return new Promise((resolve, reject) => {
			Promise
				.all([
					post.create({ author, topic_id, comment, created: new Date() }),
					// follower.create({ email: author, topic_id }),
				])
				.then(results => {
					notifyNewPost(results[0].dataValues)

					resolve({
						post: results[0].dataValues,
					})
				})
		})
	}

	const getFollows = (email) => {
		return new Promise((resolve, reject) => {
			follower.findAll({
				where: {
					email
				}
			})
				.then(results => resolve(results.map(el => el.topic_id)))
		})
	}

	const follow = (email, topic_id) => {
		return new Promise((resolve, reject) => {
			Promise
				.all([
					follower.create({ email, topic_id }),
				])
				.then(results => resolve(results))
		})
	}

	const unfollow = (email, topic_id) => {
		return new Promise((resolve, reject) => {
			Promise
				.all([
					follower.destroy({ where: { email, topic_id: topic_id + "" } }),
				])
				.then(results => resolve(results))
		})
	}

	const getAllFollowers = (topic_id) => {
		return new Promise((resolve, reject) => {
			follower.findAll({
				where: {
					topic_id: topic_id+""
				}
			})
				.then(results => resolve(results.map(el => el.email)))
		})
	}

	return {
		getUserByEmail,
		addUser,
		updateLayout,
		updateSettings,
		createStandardDashboard,
		getLayoutByEmail,
		getSettingsByEmail,
		newDisscusion,
		getDisscusions,
		getDisscusion,
		newPost,
		follow,
		unfollow,
		getFollows,
		getAllFollowers
	}
}

const initModels = sequelize => {
	return new Promise((resolve, reject) => {
		const User = models.User(sequelize, Sequelize)
		const Settings = models.Settings(sequelize, Sequelize)
		const Layout = models.Layout(sequelize, Sequelize)
		const Discussion = models.Discussion(sequelize, Sequelize)
		const Post = models.Post(sequelize, Sequelize)
		const Follower = models.Follower(sequelize, Sequelize)
		Promise.all([
			User.sync({ force: false }),
			Settings.sync({ force: false }),
			Layout.sync({ force: false }),
			Discussion.sync({ force: false }),
			Post.sync({ force: false }),
			Follower.sync({ force: false }),
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
			([user, settings, layout, discussion, post, follower]) => {
				resolve(repository({ user, settings, layout, discussion, post, follower }))
			}
		).catch(e => reject(e))
	})
}

module.exports = { connect }

const standardLayout = {
	"1": {
		tabName: "tab1", layout: [{ h: 10, w: 6, i: "1", x: 6, y: 0 }, { h: 10, w: 6, i: "2", x: 0, y: 10 }]
	},
	"2": {
		tabName: "tab2", layout: [{ h: 10, w: 6, i: "3", x: 6, y: 0 }, { h: 10, w: 6, i: "4", x: 0, y: 10 },]
	}
}

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
			symbol: { value: "BITFINEX:ETHUSD" }
		}

	},
	"4": {
		type: 4, settings: { symbol: { value: "BITFINEX:ETHUSD" } }
	}
}
