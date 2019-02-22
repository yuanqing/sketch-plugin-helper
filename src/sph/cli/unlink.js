const unlink = require('../api/unlink')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'unlink',
  describe: 'Deletes the plugin symbolic link from the Sketch plugin folder',
  handler: function () {
    return unlink().catch(errorHandler)
  }
}
