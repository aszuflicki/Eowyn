const serverSettings = {
	port: 8001
}

const dbSettings = {
	user: 'priceservice',
	password: 'priceservice123',
	url: 'localhost',
	port: 5432,
	dbname: 'prices',
	opts: { // database wide options
		define: {
			freezeTableName: true // prevent sequelize from pluralizing table names
		}
	}
}

module.exports = { serverSettings, dbSettings }
