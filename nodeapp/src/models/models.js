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

const Settings = (sequelize, types) =>
	sequelize.define('settings', {
		email: {
			type: types.STRING(32),
		},
		settings: types.JSON
	})

const Layout = (sequelize, types) =>
	sequelize.define('layout', {
		email: {
			type: types.STRING(32),
		},
		layout: types.JSON
	})


module.exports = { User, Dashboard, Settings, Layout }
