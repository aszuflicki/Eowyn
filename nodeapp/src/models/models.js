'use strict'

const User = (sequelize, types) =>
	sequelize.define('user', {
		id: {
			type: types.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: types.STRING(32),
		pass: types.STRING(32)
	})

module.exports = { User }
