'use strict'

module.exports = (app, options) => {
	const { repo } = options

	app.get('/prices/btc', (req, res) => {
		const { from, to } = req.params
		repo.getBTC(from, to)
			.then(values => {
				res.status(200).json(values)
			})
			.catch(err => {
				req.status(500).json({ msg: 'Internal error' })
				Error(err)
			})
	})
}
