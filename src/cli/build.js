const api = require('../api')
const errorHandler = require('./utilities/error-handler')

module.exports = {
  command: 'build',
  alias: ['b'],
  describe: 'Build the plugin',
  handler: async function () {
    return api.build().catch(errorHandler)
  }
}
