const api = require('../api')

module.exports = {
  command: 'version <type>',
  alias: ['v'],
  describe: 'Update the version of your Sketch plugin',
  handler: async function ({ type }) {
    return api.version(type).catch(function (error) {
      console.error(error)
    })
  }
}
