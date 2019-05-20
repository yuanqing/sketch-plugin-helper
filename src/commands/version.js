import { updateVersion } from '../common/update-version'
import * as log from '../common/log'
import { errorHandler } from '../common/error-handler'

export const version = {
  command: 'version <type>',
  describe: 'Updates the plugin version',
  builder: function (yargs) {
    yargs.positional('type', {
      type: 'string',
      choices: ['patch', 'minor', 'major']
    })
  },
  handler: async function ({ type }) {
    await updateVersion(type).catch(errorHandler)
    log.success('Updated version')
    return Promise.resolve()
  }
}
