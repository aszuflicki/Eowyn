const cors = require('cors')
const { whitelist } = require('./../config/cors')

module.exports = (app, options) => {
    app.use(cors({
        origin: function(origin, callback){
          // allow requests with no origin 
          // (like mobile apps or curl requests)
          if(!origin) return callback(null, true);
          if(whitelist.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                      'allow access from the specified Origin.';
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        }
      }));

      
}


