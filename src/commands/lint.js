import { createErrorHandler } from '../common/create-error-handler'
import { fix } from '../common/lint/fix'
import { lint as lintApi } from '../common/lint/lint'
import { createLogger } from '../common/create-logger'

export const lint = {
  command: 'lint',
  describe: 'Lints the plugin implementation code in `src/`',
  builder: function (yargs) {
    yargs.option('shouldFix', {
      alias: ['fix', 'f'],
      type: 'boolean'
    })
  },
  handler: async function ({ shouldFix }) {
    const logger = createLogger()
    if (shouldFix) {
      await fix().catch(createErrorHandler(logger))
      logger.succeed('Fixed')
    } else {
      await lintApi().catch(createErrorHandler(logger))
      logger.succeed('Linted')
    }
    return Promise.resolve()
  }
}
