const createInput = require('./create-input')

const inputTypes = Object.keys(createInput).reduce(function (result, key) {
  result[key] = key
  return result
}, {})

module.exports = inputTypes
