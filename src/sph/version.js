import { version as versionApi } from '../common/version'
import { createSpinner } from './create-spinner'
import { errorHandler } from './error-handler'

export const version = {
  command: 'version <type>',
  describe: 'Updates the version of the Sketch plugin',
  handler: async function ({ type }) {
    const spinner = createSpinner()
    spinner.loading('Updating version...')
    await versionApi(type).catch(errorHandler())
    spinner.succeed('Updated version')
    return Promise.resolve()
  }
}
