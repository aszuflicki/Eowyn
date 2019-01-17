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
    app.get("/", ensureAuthenticated, (req, res) => {
        return res.status(200).send("YAY! ")
    })

    app.get("/protected", ensureAuthenticated, (req, res) => {
        return res.status(200).send("YAY! this is a protected Route")
    })

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
        // res.json({ msg: 'xdd' })

        signUp(repo, email, password)
            .then(response => {
                console.log("------------")
                console.log(response)
                repo.createStandardDashboard(email)
                    .then(() => res.status(201).json({ msg: "Ok" }))
            })
            .catch(err => {
                console.log("ERR ------------")
                console.log(err)
                res.json({ msg: err })
            })
    })

    app.get('/layout', ensureAuthenticated, (req, res) => {
        let { email } = req.locals;
        const { no } = req.params
        repo.getLayoutByEmail(email, no)
            .then(results => {
                return res.json(results)
            })

    })

    app.get('/layouts', ensureAuthenticated, (req, res) => {
        let { email } = req.locals;
        repo.getAllLayoutsByEmail(email)
            .then(results => {
                return res.json(results)
            })

    })

    app.get('/settings', ensureAuthenticated, (req, res) => {
        let { email } = req.locals;
        const { no } = req.params
        repo.getSettingsByEmail(email, no)
            .then((results => {
                return res.json(results)
            }))
    })

    app.get('/tabs', ensureAuthenticated, (req, res) => {
        let { email } = req.locals;
        repo.getTabsByEmail(email)
            .then((tabs => {
                return res.json(tabs)
            }))
    })

}