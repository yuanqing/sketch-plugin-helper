const build = require('../api/build')
const watch = require('../api/watch')
const errorHandler = require('./error-handler')

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
