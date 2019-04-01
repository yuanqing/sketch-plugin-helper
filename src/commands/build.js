import { buildPlugin } from '../common/build-plugin/build-plugin'
import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { watch } from '../common/watch'

export const build = {
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
    const logger = createLogger()
    logger.loading('Building...')
    const errorHandler = createErrorHandler(logger)
    await buildPlugin(isDevelopment || shouldWatch).catch(errorHandler)
    logger.succeed('Built')
    if (shouldWatch) {
      return watch({
        onReady: function () {
          logger.loading('Watching...')
        },
        onChange: function () {
          logger.info('Change detected')
          logger.loading('Building...')
        },
        onSuccess: function () {
          logger.succeed('Built')
          logger.loading('Watching...')
        }
      }).catch(errorHandler)
    }
    return Promise.resolve()
  }
}
