const version = require('../api/version')

module.exports = {
  command: 'version <type>',
  alias: ['v'],
  describe: 'Update the version of your Sketch plugin',
  handler: function ({ type }) {
    return version(type).catch(function (error) {
      console.error(error)
    })
  }
}
