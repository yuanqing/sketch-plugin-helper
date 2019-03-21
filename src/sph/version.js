import version from '../common/version'
import createSpinner from './create-spinner'
import errorHandler from './error-handler'

export default {
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
