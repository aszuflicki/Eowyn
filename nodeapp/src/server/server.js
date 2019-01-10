const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const api = require('../api/api')
const cors = require('./../middleware/cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const start = (options) => {
    return new Promise((resolve, reject) => {
        if (!options.repo) {
            reject(new Error('The server must be started with a connected repository'))
        }
        if (!options.port) {
            reject(new Error('The server must be started with an available port'))
        }

        const app = express()
        app.use(morgan('dev'))
        app.use(helmet())
        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err))
            res.status(500).send('Something went wrong!')
        })

        app.use(bodyParser.json());

        cors(app, options)
        api(app, options)

        const http = require('http').Server(app);
        const io = require('socket.io')(http);

        io.on('connection', function (socket) {
            console.log('connected -----------------')
            socket.on('dashboard_layout', function (layout, token) {
                console.log(layout)
                console.log(token)
                jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
                    if (err) {
                        console.log(err)
                    } else {
                        options.repo.updateDashboardLayout(decoded.email, layout[0])
                    }
                });
            });

            socket.on('dashboard_settings', function (msg) {
                // options.repo.updateDashboardLayout()
            });
        });

        http.listen(options.port, () => resolve({}))
    })
}

module.exports = { start }
