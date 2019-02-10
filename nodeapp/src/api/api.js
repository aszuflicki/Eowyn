'use strict'
const status = require('http-status')
const passport = require("passport");
const { strategy, signUp, logIn, ensureAuthenticated } = require("./../middleware/passport")
const upload = require('../middleware/multer')
const path = require('path')
const fs = require('fs')

module.exports = (app, options) => {
    const { repo } = options

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

    app.post('/discussions', ensureAuthenticated, (req, res) => {
        let { email } = req.locals;
        let { category, topic, desc, tags } = req.body;
        console.log(email, category, topic, desc, tags)
        repo.newDisscusion(email, category, topic, desc, tags)
            .then((results => {
                res.json(results)
            }))
    })

    app.get('/discussions/', (req, res) => {
        const { offset=0 } = req.query
        repo.getDisscusions(offset)
            .then((results => {
                res.json(results)
            }))
    })

    app.get('/discussions/:id', (req, res) => {
        const { offset=0 } = req.query
        let { id } = req.params;
        repo.getDisscusions(offset, id)
            .then((results => {
                res.json(results)
            }))
    })

    app.get('/discussion/:id', (req, res) => {
        let { id } = req.params;
        const { offset=0 } = req.query
        repo.getDisscusion(id, offset)
            .then((results => {
                res.json(results)
            }))
    })

    app.post('/discussion', ensureAuthenticated, (req, res) => {
        let { email } = req.locals;
        let { topic_id, text } = req.body;
        repo.newPost(email, topic_id, text)
            .then((results => {
                console.log(results)
                res.json(results)
            }))
    })

    app.get('/follows', ensureAuthenticated, (req, res) => {
        let { email } = req.locals

        repo.getFollows(email)
            .then(results => {
                console.log(results)
                res.json(results)
            })
    })

    app.post('/follow', ensureAuthenticated, (req, res) => {
        let { email } = req.locals
        let { topic_id } = req.body;

        repo.follow(email, topic_id)
            .then(results => {
                console.log(results)
                res.json(results)
            })
    })

    app.post('/unfollow', ensureAuthenticated, (req, res) => {
        let { email } = req.locals
        let { topic_id } = req.body;

        repo.unfollow(email, topic_id)
            .then(results => {
                console.log(results)
                res.json(results)
            })
    })

    app.post('/upload', ensureAuthenticated, (req, res) => {
        const { email } = req.locals
        upload(req, res, (err) => {
            if (err) {
                res.json({
                    msg_err: err
                });
                return;
            }

            if (req.file == undefined) {
                res.json({
                    err: 'No File Selected!'
                });
                return;
            }

            repo.getProfilePic(email)
                .then((result) => {
                    fs.unlink(path.resolve(__dirname + `../../../public/uploads/${result}`), (err) => {
                        if (err) console.log(err);
                        repo.setProfilePic(email, req.file.filename)
                            .then(result => {
                                console.log(result)
                                console.log(req.file.filename)
                                res.json({
                                    msg: 'File Uploaded!',
                                    file: `uploads/${req.file.filename}`
                                });
                            })
                    });
                })


        });
    });

    app.delete('/upload', ensureAuthenticated, (req, res) => {
        const { email } = req.locals
        repo.getProfilePic(email)
            .then((result) => {
                fs.unlink(path.resolve(__dirname + `../../../public/uploads/${result}`), (err) => {
                    if (err) throw err;
                    repo.setProfilePic(email, 'def.jpg')

                    res.json({
                        msg: 'File deleted!',
                    });
                });
            })
    });

    app.get('/profile/pic/:email', (req, res) => {
        const { email } = req.params
        console.log(__dirname)
        repo.getProfilePic(email)
            .then((result) => {
                res.sendFile(path.resolve(__dirname + `../../../public/uploads/${result}`))
            })

    })


}