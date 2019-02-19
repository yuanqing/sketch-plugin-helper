const mustache = require('mustache')

mustache.escape = function (text) {
  return text
}

function interpolate (string, data) {
  return mustache.render(string, data)
}

module.exports = interpolate
