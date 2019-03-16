const createForm = require('./create-form')

const formTypes = Object.keys(createForm).reduce(function (result, key) {
  result[key] = key
  return result
}, {})

module.exports = formTypes
