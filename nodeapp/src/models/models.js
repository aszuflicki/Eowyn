'use strict'

const User = (sequelize, types) =>
	sequelize.define('user', {
		id: {
			type: types.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: types.STRING(32),
		pass: types.STRING(127)
	})

const Dashboard = (sequelize, types) =>
	sequelize.define('dashboard', {
		email: {
			type: types.STRING(32),
			primaryKey: true
		},
		layout: types.JSON,
		settings: types.JSON
	})
	
module.exports = { User, Dashboard }
