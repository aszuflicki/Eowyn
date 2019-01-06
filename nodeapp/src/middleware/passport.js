const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt')
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY';

const strategy = (repo) => new JwtStrategy(opts, (jwt_payload, done) => {
  if (repo.getUserByEmail(jwt_payload.email)) {
    return done(null, true)
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
            const secret = "SECRET_KEY"
            const token = jwt.sign({ email }, secret, opts);

            resolve({
              token
            })
          } else {

            reject("Auth Failed")
          }
        });
      })
  })
}

const signUp = (repo, email, password) => {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      reject({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
      reject({ msg: 'Password must be at least 6 characters' });
    }


    repo.getUserByEmail(email)
      .then(user => {
        if (user.length != 0) {
          reject({ msg: 'Email already exists' });
        } else {
          bcrypt.hash(password, 10).then(function (hash) {
            repo.addUser(email, hash)
            resolve({ msg: "Ok" })
          })
        }
      })
      .catch(err => {
        console.log(err)
        reject('Ooops...')
      })
  })
}

const passport = require("passport");
passport.use(strategy);

const ensureAuthenticated = passport.authenticate('jwt', { session: false })

module.exports = { strategy, signUp, logIn, ensureAuthenticated }
