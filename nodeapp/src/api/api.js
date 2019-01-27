'use strict'
const status = require('http-status')
const passport = require("passport");
const { strategy, signUp, logIn, ensureAuthenticated } = require("./../middleware/passport")

module.exports = (app, options) => {
    const { repo } = options

    passport.use(strategy(repo));

    app.post("/login", (req, res) => {
        let { email, password } = req.body;

        logIn(repo, email, password)
            .then(response => {
                console.log(response)
                res.json({
                    msg: "Auth Passed",
                    token: response.token
                })
            })
            .catch(err => {
                console.log(err)
                res.status(401).json({ msg: "Auth Failed" })
            })
    });

    app.post('/register', (req, res) => {
        let { password, email } = req.body;
        console.log({ password, email })

        signUp(repo, email, password)
            .then(response => {
                console.log(response)
                repo.createStandardDashboard(email)
                    .then(() => res.status(201).json({ msg: "Ok" }))
            })
            .catch(err => {
                res.json({ msg: err })
            })
    })

    app.get('/layout', ensureAuthenticated, (req, res) => {
        let { email } = req.locals;
        repo.getLayoutByEmail(email)
            .then(results => {
                return res.json(results)
            })

    })

    app.get('/settings', ensureAuthenticated, (req, res) => {
        let { email } = req.locals;
        repo.getSettingsByEmail(email)
            .then((results => {
                return res.json(results)
            }))
    })
}