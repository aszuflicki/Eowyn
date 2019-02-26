const dbSettings = {
  user: 'nodeapp',
  pass: 'nodeapp123',
  url: 'localhost',
  port: 5432,
  dbname: 'nodeapp',
  opts: { // database wide options
    define: {
      freezeTableName: false // prevent sequelize from pluralizing table names
    }
  }
}

const serverSettings = {
  port: process.env.PORT || 8081
}

module.exports = { dbSettings, serverSettings }
