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

const Discussion = (sequelize, types) =>
	sequelize.define('discussion', {
		id: {
			type: types.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		category: types.INTEGER,
		topic: types.STRING(255),
		desc: types.STRING(511),
		author: types.STRING(511),
		created: types.DATE,
		answeared: types.DATE
	})

const Post = (sequelize, types) =>
	sequelize.define('post', {
		id: {
			type: types.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		topic_id: types.INTEGER,
		
		author: types.STRING(32),
		comment: types.STRING(255),
		created: types.DATE,
	})

const Follower = (sequelize, types) =>
	sequelize.define('follower', {
		topic_id: types.STRING(255),
		email: types.STRING(32),
	})


module.exports = { User, Dashboard, Settings, Layout,
					Discussion, Post, Follower }
