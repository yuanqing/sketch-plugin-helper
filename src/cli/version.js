const version = require('../api/version')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'version <type>',
  describe: 'Updates the version of the Sketch plugin',
  handler: function ({ type }) {
    return version(type).catch(errorHandler)
  }
}
