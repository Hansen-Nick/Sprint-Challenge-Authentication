const db = require('../database/dbConfig');

function add(userData) {
 return db('users').insert(userData, 'id')
  .then(ids => {
    const [id] = ids
    return findByID(id)
  })
}

function findByID(id) {
  return db('users').select('username').where({id})
}

function findByFilter(filter) {
  return db('users').select('username', 'password').where(filter)
}

function find() {
  return db('users')
}

module.exports = {
  add,
  find,
  findByID,
  findByFilter
}