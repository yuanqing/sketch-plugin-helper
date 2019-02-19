const link = require('../api/link')

module.exports = {
  command: 'link',
  alias: ['l'],
  describe: 'Symlinks your plugin to the Sketch plugin folder',
  handler: function ({ type }) {
    return link().catch(function (error) {
      console.error(error)
    })
  }
}
