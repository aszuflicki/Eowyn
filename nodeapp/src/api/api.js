'use strict'
const status = require('http-status')
const passport = require("passport");
const { strategy, signUp, logIn, ensureAuthenticated } = require("./../middleware/passport")

module.exports = (app, options) => {
    const { repo } = options

    passport.use(strategy(repo));
    app.get('/dashboard', (req, res, next) => {
        repo.getDashboard(req.user)
            .then(dashboard => {
                res.status(status.OK).json(dashboard)
            })
            .catch(next)
    })

    app.get("/protected", ensureAuthenticated, (req, res) => {
        return res.status(200).send("YAY! this is a protected Route")
    })

    app.post("/login", (req, res) => {
        let { email, password } = req.body;

        logIn(repo, email, password)
            .then(response => {
                res.status(200).json({
                    msg: "Auth Passed",
                    token
                })
            })
            .catch(err => {
                res.status(401).json({ message: "Auth Failed" })
            })
    });

    app.post('/register', (req, res) => {
        let { password, email } = req.body;

        signUp(repo, email, password)
            .then(response => {
                res.status(201).json({ msg: "Ok" })
            })
            .catch(err => {
                res.json({ msg: err })
            })
    })
}