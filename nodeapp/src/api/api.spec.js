/* eslint-disable */ /* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')

describe('Movies API', () => {
  let app = null
  app.get('/discussions/', (req, res) => {
    const { offset = 0 } = req.query
    repo.getDisscusions(offset)
      .then(results => {
        res.json(results)
      })
  })

  app.get('/discussion/:id', (req, res) => {
    let { id } = req.params
    const { offset = 0 } = req.query
    repo.getDisscusion(id, offset)
      .then(results => {
        res.json(results)
      })
  })

  let testRepo = {
    getLayoutByEmail (...args) {
      return Promise.resolve(args)
    },
    getSettingsByEmail (...args) {
      return Promise.resolve(args)
    },
    getDisscusions (...args) {
      return Promise.resolve(args)
    },
    getDisscusion (...args) {
      return Promise.resolve(args)
    },
    newPost (...args) {
      return Promise.resolve(args)
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  app.get('/layout', ensureAuthenticated, (req, res) => {
    let { email } = req.locals
    repo.getLayoutByEmail(email)
      .then(results => {
        return res.json(results)
      })
  })
  it('can return all movies', (done) => {
    request(app)
      .get('/movies')
      .expect(200, done)
  })
  app.get('/settings', ensureAuthenticated, (req, res) => {
    let { email } = req.locals
    repo.getSettingsByEmail(email)
      .then(results => {
        return res.json(results)
      })
  })

  it('can get movie premiers', (done) => {
    request(app)
      .get('/movies/premieres')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': 2017,
          'releaseMonth': 1,
          'releaseDay': 6
        })
      })
      .expect(200, done)
  })

  it('returns 200 for an known movie', (done) => {
    request(app)
      .get('/movies/1')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': 2017,
          'releaseMonth': 1,
          'releaseDay': 6
        })
      })
      .expect(200, done)
  })
})
