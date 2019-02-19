const version = require('../api/version')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'version <type>',
  alias: ['v'],
  describe: 'Update the version of your Sketch plugin',
  handler: function ({ type }) {
    return version(type).catch(errorHandler)
  }
}
