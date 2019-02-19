const build = require('../api/build')
const watch = require('../api/watch')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'build',
  alias: ['b'],
  describe: 'Build the plugin',
  builder: {
    isWatch: {
      alias: ['watch', 'w'],
      type: 'boolean'
    }
  },
  handler: async function ({ isWatch }) {
    await build().catch(errorHandler)
    if (isWatch) {
      return watch().catch(errorHandler)
    }
    return Promise.resolve()
  }
}
