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
		no: {
			type: types.INTEGER
		},
		settings: types.JSON
	})

const Layout = (sequelize, types) =>
	sequelize.define('layout', {
		email: {
			type: types.STRING(32),
		},
		no: {
			type: types.INTEGER,
		},
		layout: types.JSON
	})

const Tabs = (sequelize, types) =>
	sequelize.define('tabs', {
		email: {
			type: types.STRING(32),
		},
		tabs: types.JSON
	})



module.exports = { User, Dashboard, Settings, Layout, Tabs }
