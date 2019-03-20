const brfs = require('brfs')

module.exports = function (resource) {
  return brfs(resource, {
    parserOpts: {
      sourceType: 'module'
    }
  })
}
