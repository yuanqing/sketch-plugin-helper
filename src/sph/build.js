const build = require('../common/build')
const watch = require('../common/watch')
const errorHandler = require('../common/error-handler')

module.exports = {
  command: 'build',
  describe: 'Builds the plugin',
  builder: {
    shouldWatch: {
      alias: ['watch', 'w'],
      type: 'boolean'
    }
  },
  handler: async function ({ shouldWatch }) {
    await build().catch(errorHandler)
    if (shouldWatch) {
      return watch().catch(errorHandler)
    }
    return Promise.resolve()
  }
}
