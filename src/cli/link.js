const link = require('../api/link')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'link',
  describe: 'Symlinks the plugin to the Sketch plugin folder',
  handler: function () {
    return link().catch(errorHandler)
  }
}
