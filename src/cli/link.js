const link = require('../api/link')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'link',
  alias: ['l'],
  describe: 'Symlinks your plugin to the Sketch plugin folder',
  handler: function ({ type }) {
    return link().catch(errorHandler)
  }
}
