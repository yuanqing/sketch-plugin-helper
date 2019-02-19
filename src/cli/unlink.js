const unlink = require('../api/unlink')

module.exports = {
  command: 'unlink',
  alias: ['u'],
  describe: 'Removes the plugin symbolic link from the Sketch plugin folder',
  handler: function ({ type }) {
    return unlink().catch(function (error) {
      console.error(error)
    })
  }
}
