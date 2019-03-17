const build = require('../common/build')
const watch = require('../common/watch')
const createSpinner = require('./create-spinner')
const errorHandler = require('./error-handler')

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
    const spinner = createSpinner('Building...')
    await build(isDevelopment || shouldWatch).catch(errorHandler(spinner))
    spinner.succeed('Built')
    if (shouldWatch) {
      return watch({
        onReady: function () {
          spinner('Watching...')
        },
        onChange: function () {
          spinner.info('Change detected')
          spinner('Building...')
        },
        onSuccess: function () {
          spinner.succeed('Built')
          spinner('Watching...')
        }
      }).catch(errorHandler(spinner))
    }
    return Promise.resolve()
  }
}
