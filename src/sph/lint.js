const errorHandler = require('../common/error-handler')
const fix = require('../common/lint/fix')
const lint = require('../common/lint/lint')

module.exports = {
  command: 'lint',
  describe: 'Lints the plugin implementation code in `src/`',
  builder: {
    shouldFix: {
      alias: ['fix', 'f'],
      type: 'boolean'
    }
  },
  handler: function ({ shouldFix }) {
    return (shouldFix ? fix : lint)().catch(errorHandler)
  }
}
