import { fix as fixApi } from '../common/lint/fix'
import { lint as lintApi } from '../common/lint/lint'
import * as log from '../common/log'
import { errorHandler } from '../common/error-handler'

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
    if (fix) {
      log.info('Fixing…')
      await fixApi().catch(errorHandler)
      log.success('Fixed')
    } else {
      log.info('Linting…')
      await lintApi().catch(errorHandler)
      log.success('Linted')
    }
    return Promise.resolve()
  }
}
