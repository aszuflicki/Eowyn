'use strict'

const BTC = (sequelize, types) =>
	sequelize.define('btcs', {
		_time: {
			type: types.DATE,
			primaryKey: true
		},
		price: {
			type: types.DOUBLE
		}
	}, {
		timestamps: false
	})

module.exports = { BTC }
