import { buildPlugin } from '../common/build-plugin/build-plugin'
import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { exec } from '../common/exec'
import { watchSourceDirectory } from '../common/watch-source-directory'

export const build = {
  command: 'build',
  describe: 'Builds the plugin',
  builder: function (yargs) {
    yargs.option('development', {
      alias: ['develop', 'dev', 'd'],
      type: 'boolean',
      default: false
    })
    yargs.option('watch', {
      alias: ['w'],
      type: 'boolean',
      default: false
    })
    yargs.option('command', {
      alias: ['c'],
      type: 'string',
      default: null
    })
  },
  handler: async function ({ development, watch, command }) {
    const logger = createLogger()
    const errorHandler = createErrorHandler(logger)
    async function build () {
      logger.loading('Building...')
      await buildPlugin({ development: development || watch }).catch(
        errorHandler
      )
      command && (await exec(command))
      logger.succeed('Built')
    }
    if (watch) {
      return watchSourceDirectory({
        onReady: async function () {
          await build()
          logger.loading('Watching...')
        },
        onChange: async function () {
          logger.info('Change detected')
          await build()
          logger.loading('Watching...')
        }
      })
    }
    await build()
    return Promise.resolve()
  }
}
