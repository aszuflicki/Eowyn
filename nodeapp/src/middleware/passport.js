const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt-nodejs')
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY';

const strategy = (repo) => new JwtStrategy(opts, (jwt_payload, done) => {
  console.log(jwt_payload)
  if (repo.getUserByEmail(jwt_payload.email)) {
    const user = { email: jwt_payload.email }
    return done(null, user)
  }
  return done(null, false)
})

const logIn = (repo, email, plainPassword) => {
  return new Promise((resolve, reject) => {
    repo.getUserByEmail(email)
      .then((user) => {
        if (user.length == 0) {
          reject({ msg: "Auth failed" })
        }
        const { pass: hashedPassword } = user[0].dataValues

        bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
          if (err) console.log(err)

          if (result) {
            let opts = {}
            opts.expiresIn = 60 * 60 * 12;
            const secret = 'SECRET_KEY'
            const token = jwt.sign({ email }, secret, opts);

            resolve({
              token
            })
          } else {

            reject("Auth Failed")
          }
        });
      })
      .catch(er => console.log(err))
  })
}

const signUp = (repo, email, password) => {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      return reject({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
      return reject({ msg: 'Password must be at least 6 characters' });
    }

    repo.getUserByEmail(email)
      .then(user => {
        console.log(user)
        if (user.length !== 0) {
          return reject({ msg: 'Email already exists' });
        } else {
          const hash = bcrypt.hashSync(password)
          repo.addUser(email, hash)
          return resolve({ msg: "Ok" })
        }
      })
      .catch(err => {
        console.log(err)
        reject({ msg: 'Ooops...' })
      })
  })
}

const passport = require("passport");
passport.use(strategy);

const ensureAuthenticated = (req, res, next) => {
  let token = req.params['x-access-token'] || req.query['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  // console.log(token)

  if (token) {
    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.locals = decoded
        next()
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = { strategy, signUp, logIn, ensureAuthenticated }
