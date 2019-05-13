import { createErrorHandler } from '../common/create-error-handler'
import { fix as fixApi } from '../common/lint/fix'
import { lint as lintApi } from '../common/lint/lint'
import { createLogger } from '../common/create-logger'

export const lint = {
  command: 'lint',
  describe: 'Lints the plugin implementation code',
  builder: function (yargs) {
    yargs.option('fix', {
      alias: ['f'],
      type: 'boolean'
    })
  },
  handler: async function ({ fix }) {
    const logger = createLogger()
    if (fix) {
      await fixApi().catch(createErrorHandler(logger))
      logger.succeed('Fixed')
    } else {
      await lintApi().catch(createErrorHandler(logger))
      logger.succeed('Linted')
    }
    return Promise.resolve()
  }
}
