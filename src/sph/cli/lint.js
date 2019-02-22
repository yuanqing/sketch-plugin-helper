const lint = require('../api/lint')
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
  handler: function ({ shouldFix }) {
    return lint(shouldFix).catch(errorHandler)
  }
}
