const version = require('../common/version')
const createSpinner = require('./create-spinner')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'version <type>',
  describe: 'Updates the version of the Sketch plugin',
  handler: async function ({ type }) {
    const spinner = createSpinner()
    spinner.loading('Updating version...')
    await version(type).catch(errorHandler())
    spinner.succeed('Updated version')
    return Promise.resolve()
  }
}
