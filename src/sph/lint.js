import fix from '../common/lint/fix'
import lint from '../common/lint/lint'
import createSpinner from './create-spinner'
import errorHandler from './error-handler'

export default {
  command: 'lint',
  describe: 'Lints the plugin implementation code in `src/`',
  builder: {
    shouldFix: {
      alias: ['fix', 'f'],
      type: 'boolean'
    }
  },
  handler: async function ({ shouldFix }) {
    const spinner = createSpinner()
    if (shouldFix) {
      await fix().catch(errorHandler(spinner))
      spinner.succeed('Fixed')
    } else {
      await lint().catch(errorHandler(spinner))
      spinner.succeed('Linted')
    }
    return Promise.resolve()
  }
}
