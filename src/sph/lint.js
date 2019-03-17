const fix = require('../common/lint/fix')
const lint = require('../common/lint/lint')
const createSpinner = require('./create-spinner')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'lint',
  describe: 'Lints the plugin implementation code in `src/`',
  builder: {
    shouldFix: {
      alias: ['fix', 'f'],
      type: 'boolean'
    }
  },
  handler: async function ({ shouldFix }) {
    const spinner = createSpinner('Linting...')
    await (shouldFix ? fix : lint)().catch(errorHandler(spinner))
    spinner.succeed('Linted')
    return Promise.resolve()
  }
}
