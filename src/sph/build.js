const build = require('../common/build')
const watch = require('../common/watch')
const errorHandler = require('../common/error-handler')

module.exports = {
  command: 'build',
  describe: 'Builds the plugin',
  builder: {
    isDevelopment: {
      alias: ['development', 'develop', 'dev', 'd'],
      type: 'boolean',
      default: false
    },
    shouldWatch: {
      alias: ['watch', 'w'],
      type: 'boolean',
      default: false
    }
  },
  handler: async function ({ isDevelopment, shouldWatch }) {
    process.NODE_ENV = isDevelopment ? 'development' : 'production'
    await build(isDevelopment).catch(errorHandler)
    if (shouldWatch) {
      return watch().catch(errorHandler)
    }
    return Promise.resolve()
  }
}