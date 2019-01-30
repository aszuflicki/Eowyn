const r = require('rethinkdb');

const connect = (mediator) => {
	mediator.once('postgres.ready', () => {
		r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
            if (err) throw err;
            mediator.emit('rethinkdb.ready', conn)
        })
	})
}

module.exports = { connect }