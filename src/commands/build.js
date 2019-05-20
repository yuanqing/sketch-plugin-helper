import { buildPlugin } from '../common/build-plugin/build-plugin'
import { executeShellCommand } from '../common/execute-shell-command'
import { watchSourceDirectory } from '../common/watch-source-directory'
import * as log from '../common/log'
import { errorHandler } from '../common/error-handler'

export const build = {
  command: 'build',
  describe: 'Builds the plugin',
  builder: function (yargs) {
    yargs.option('development', {
      alias: ['dev', 'd'],
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
  handler: function ({ development, watch, command }) {
    async function build (shouldClearLine) {
      log.info('Building…')
      await buildPlugin({ development: development || watch }).catch(
        errorHandler
      )
      if (command) {
        await executeShellCommand(command).catch(errorHandler)
      }
      if (shouldClearLine) {
        log.clearLine()
      }
      log.success('Built')
      return Promise.resolve()
    }
    if (watch) {
      return watchSourceDirectory({
        onReady: async function () {
          await build(true)
          log.info('Watching…')
        },
        onChange: async function () {
          log.clearLine() // 'Built'
          log.clearLine() // 'Watching…'
          await build(true)
          log.info('Watching…')
        }
      })
    }
    return build(false)
  }
}
