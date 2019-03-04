'use strict'
const models = require('../models/models')
const Sequelize = require('sequelize')
const { notifyNewPost } = require('../api/socket')
const Op = Sequelize.Op;

const repository = ({ user, settings, layout, discussion, post, follower }) => {
  const getUserByEmail = email => {
    return new Promise((resolve, reject) => {
      user
        .findAll({
          where: {
            email
          }
        })
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const addUser = (email, pass, username = email, profile_pic = 'def.jpg') => {
    return new Promise((resolve, reject) => {
      user.create({ email, pass })
        .then(() =>
          user.findOrCreate({ where: { email, pass } })
        )
        .spread((user, created) => {
          user.update({ username: email, profile_pic }, { where: { email } })
          resolve({ user, created })
        })
    })
  }

  const getLayoutByEmail = (email) => {
    return new Promise((resolve, reject) => {
      layout
        .findAll({
          where: {
            email
          }
        })
        .then(result => {
          resolve(result[0].dataValues.layout)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const getSettingsByEmail = (email, no = 0) => {
    return new Promise((resolve, reject) => {
      settings
        .findAll({
          where: {
            email
          }
        })
        .then(result => {
          resolve(result[0].dataValues.settings)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const createStandardDashboard = (email) => {
    return new Promise((resolve, reject) => {
      Promise
        .all([
          settings.upsert({ email, settings: standadSettings }),
          layout.upsert({ email, layout: standardLayout })
        ])
        .then((...values) => resolve(values))
    })
  }

  const updateLayout = (email, layout_) => {
    return new Promise((resolve, reject) => {
      console.log()
      Promise
        .all([
          layout.update({ email, layout: layout_ }, { where: { email } })
        ])
        .then(results => resolve(results))
    })
  }

  const updateSettings = (email, settings_) => {
    return new Promise((resolve, reject) => {
      Promise
        .all([
          settings.update({ email, settings: settings_ }, { where: { email } })
        ])
        .then(results => resolve(results))
    })
  }

  const newDisscusion = (email, category, topic, desc, tags) => {
    console.log({ email, category, topic, desc, tags })
    return new Promise((resolve, reject) => {
      Promise
        .all([
          discussion.create({ category: JSON.stringify(tags), topic, desc, author: email, created: new Date(), answeared: new Date(), posts: 0 })
        ])
        .then(results => resolve(results[0].dataValues))
    })
  }

  const getDisscusions = (offset = 0, category) => {
    return new Promise((resolve, reject) => {
      let params = {
        limit: 20,
        offset,
        order: [['updatedAt', 'DESC']]
      }

      console.log("xd" + category)

      if (category) params['where'] = {
        'category': {
          [Op.like]: {
            [Op.all]: category.map(el => `%${el}%`)
          }
        }
      }

      Promise
        .all([
          discussion.findAndCountAll(params)
        ])
        .then(results => {
          console.log(results)
          resolve(results[0])
        })
        .catch(err => console.log(err))
    })
  }

  const getDisscusion = (id, offset) => {
    return new Promise((resolve, reject) => {
      Promise
        .all([
          discussion.findOne({ where: { id } }),
          post.findAndCountAll({
            where: { topic_id: id },
            order: [['updatedAt', 'DESC']],
            limit: 20,
            offset
          })
        ])
        .then(results => {
          resolve({
            discussion: results[0].dataValues,
            posts: results[1]
          })
        })
    })
  }

  const newPost = (author, topicID, comment) => {
    return new Promise((resolve, reject) => {
      Promise
        .all([
          post.create({ author, topic_id: topicID, comment, created: new Date() }),
          follower.create({ email: author, topic_id: topicID }),
          discussion.update({
            posts: Sequelize.literal('posts + 1')
          }, {
              where: { id: topicID }
            })
        ])
        .then(results => {
          notifyNewPost(results[0].dataValues)

          resolve({
            post: results[0].dataValues
          })
        })
    })
  }

  const getFollows = (email) => {
    return new Promise((resolve, reject) => {
      follower.findAll({
        where: {
          email
        }
      })
        .then(results => resolve(results.map(el => el.topic_id)))
    })
  }

  const getFollowed = (email, offset = 0) => {
    return new Promise((resolve, reject) => {
      let count = 0;
      let rows = [];

      follower.findAndCountAll({
        where: { email },
        order: [['updatedAt', 'DESC']],
        limit: 20,
        offset
      })
        .then(results => {
          rows = results.rows.map(el => el.dataValues.topic_id)
          count = results.count
          discussion.findAll({
            where: {
              'id': {
                [Op.eq]: { [Op.any]: rows.map(el => parseInt(el)) }
              }
            }
          })
            .then(results => {
              resolve({
                followed: {
                  rows: results.map(el => el.dataValues),
                  count
                }
              })
            })

        })
    })
  }

  const follow = (email, topicID) => {
    return new Promise((resolve, reject) => {
      Promise
        .all([
          follower.create({ email, topic_id: topicID })
        ])
        .then(results => resolve(results))
    })
  }

  const unfollow = (email, topicID) => {
    return new Promise((resolve, reject) => {
      Promise
        .all([
          follower.destroy({ where: { email, topic_id: topicID + '' } })
        ])
        .then(results => resolve(results))
    })
  }

  const getAllFollowers = (topicID) => {
    return new Promise((resolve, reject) => {
      follower.findAll({
        where: {
          topic_id: topicID + ''
        }
      })
        .then(results => resolve(results.map(el => el.email)))
    })
  }

  const getProfilePic = (email) => {
    return new Promise((resolve, reject) => {
      user
        .findAll({
          where: {
            email
          }
        })
        .then(result => {
          const { profile_pic = '' } = result[0].dataValues
          resolve(profile_pic)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const setProfilePic = (email, profilePic) => {
    return new Promise((resolve, reject) => {
      user
        .update({
          profile_pic: profilePic
        }, {
            where: {
              email
            }
          })
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  return {
    getUserByEmail,
    addUser,
    updateLayout,
    updateSettings,
    createStandardDashboard,
    getLayoutByEmail,
    getSettingsByEmail,
    newDisscusion,
    getDisscusions,
    getDisscusion,
    newPost,
    follow,
    unfollow,
    getFollows,
    getAllFollowers,
    getProfilePic,
    setProfilePic,
    getFollowed
  }
}

const initModels = sequelize => {
  return new Promise((resolve, reject) => {
    const User = models.User(sequelize, Sequelize)
    const Settings = models.Settings(sequelize, Sequelize)
    const Layout = models.Layout(sequelize, Sequelize)
    const Discussion = models.Discussion(sequelize, Sequelize)
    const Post = models.Post(sequelize, Sequelize)
    const Follower = models.Follower(sequelize, Sequelize)
    Promise.all([
      User.sync({ force: false }),
      Settings.sync({ force: false }),
      Layout.sync({ force: false }),
      Discussion.sync({ force: false }),
      Post.sync({ force: false }),
      Follower.sync({ force: false })
    ]).then((values) => {
      resolve(values)
    }).catch(e => reject(e))
  })
}

const connect = sequelize => {
  return new Promise((resolve, reject) => {
    if (!sequelize) {
      reject(new Error('Sequelize not supplied'))
    }
    initModels(sequelize).then(
      ([user, settings, layout, discussion, post, follower]) => {
        resolve(repository({ user, settings, layout, discussion, post, follower }))
      }
    ).catch(e => reject(e))
  })
}

module.exports = { connect }

const standardLayout = {
  '1': {
    tabName: 'tab1', layout: [{ h: 10, w: 6, i: '1', x: 6, y: 0 }, { h: 10, w: 6, i: '2', x: 0, y: 10 }]
  },
  '2': {
    tabName: 'tab2', layout: [{ h: 10, w: 6, i: '3', x: 6, y: 0 }, { h: 10, w: 6, i: '4', x: 0, y: 10 }]
  }
}

const standadSettings = {
  '0': {
    type: 0,
    settings: {
      symbol: { value: 'BITFINEX:ETHUSD' }
    }
  },
  '1': {
    type: 1

  },
  '2': {
    type: 2,
    settings: {
      tabs: [
        {
          title: 'Indeksssy xd',
          symbols: [{ s: 'INDEX:SPX', d: 'S&P 500' }, { s: 'INDEX:IUXX', d: 'Nasdaq 100' }]
        },
        {
          title: 'Towary',
          symbols: [{ s: 'CME_MINI:ES1!', d: 'E-Mini S&P' }, { s: 'CME:E61!', d: 'Euro' }]
        }]
    }

  },
  '3': {
    type: 3,
    settings: {
      symbol: { value: 'BITFINEX:ETHUSD' }
    }

  },
  '4': {
    type: 4, settings: { symbol: { value: 'BITFINEX:ETHUSD' } }
  }
}
