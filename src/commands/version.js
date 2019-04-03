import { createLogger } from '../common/create-logger'
import { createErrorHandler } from '../common/create-error-handler'
import { updateVersion } from '../common/update-version'

export const version = {
  command: 'version <type>',
  describe: 'Updates the version of the Sketch plugin',
  builder: function (yargs) {
    yargs.positional('type', {
      type: 'string',
      choices: ['patch', 'minor', 'major']
    })
  },
  handler: async function ({ type }) {
    const logger = createLogger()
    logger.loading('Updating version...')
    await updateVersion(type).catch(createErrorHandler(logger))
    logger.succeed('Updated version')
    return Promise.resolve()
  }
}
