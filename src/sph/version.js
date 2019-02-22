const version = require('../common/version')
const errorHandler = require('../common/error-handler')

module.exports = {
  command: 'version <type>',
  describe: 'Updates the version of the Sketch plugin',
  handler: function ({ type }) {
    return version(type).catch(errorHandler)
  }
}
