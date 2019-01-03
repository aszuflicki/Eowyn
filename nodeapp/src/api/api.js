'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const { repo } = options

    app.get('/dashboard', (req, res, next) => {
        repo.getDashboard(req.user)
            .then(dashboard => {
                res.status(status.OK).json(dashboard)
            })
            .catch(next)
    })

    app.post('/login', (req, res) => {
        const { email, password } = req.body;
    })

    app.post('/register', (req, res) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        if (!name || !email || !password || !password2) {
            res.json({ msg: 'Please enter all fields' });
        }

        if (password.length < 6) {
            res.json({ msg: 'Password must be at least 6 characters' });
        }

        let user = null;

        repo.getUserByEmail(email)
            .then(results => user = results)

        if (user != null) {
            res.json({ msg: 'Email already exists' });
        }

        bcrypt.hash(password, saltRounds).then(function (hash) {
            password = hash
        })

        repo.addUser(name, email, password)

        res.json({ msg: "Ok" })
    })
}