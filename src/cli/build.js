const api = require('../api')

module.exports = {
  command: 'build',
  alias: ['b'],
  describe: 'Build the plugin',
  handler: function () {
    return api.build().catch(function (error) {
      console.error(error)
    })
  }
}
