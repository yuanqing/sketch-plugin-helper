const link = require('../common/link')
const errorHandler = require('../common/error-handler')

module.exports = {
  command: 'link',
  describe: 'Symlinks the plugin to the Sketch plugin folder',
  handler: function () {
    return link().catch(errorHandler)
  }
}
