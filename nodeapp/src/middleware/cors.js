const cors = require('cors')

module.exports = (app, options) => {
    const { whitelist } = options.corsSettings;
    
    const corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }

    app.get('*', cors(corsOptions), function (req, res, next) {
        next()
    })
}


