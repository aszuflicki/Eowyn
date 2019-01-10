const cors = require('cors')
const { whitelist } = require('./../config/cors')

module.exports = (app, options) => {
    const corsOptions = {
        origin: function (origin, callback) {
            console.log(origin)
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }

    app.all('*', cors(corsOptions), function (req, res, next) {
        next()
    })
}


