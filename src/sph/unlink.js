const unlink = require('../common/unlink')
const errorHandler = require('../common/error-handler')

module.exports = {
  command: 'unlink',
  describe: 'Deletes the plugin symbolic link from the Sketch plugin folder',
  handler: function () {
    return unlink().catch(errorHandler)
  }
}
