import { runHandler } from '../common/run-handler'
import * as log from '../common/log'
import { errorHandler } from '../common/error-handler'

export const handler = {
  command: 'handler <name>',
  describe: 'Runs the given plugin handler in Sketch',
  builder: function (yargs) {
    yargs.positional('handler', {
      type: 'string'
    })
  },
  handler: async function ({ name }) {
    await runHandler(name).catch(errorHandler)
    log.success('Ran plugin handler')
    return Promise.resolve()
  }
}
