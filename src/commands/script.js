import { runScript } from '../common/run-script'
import * as log from '../common/log'
import { errorHandler } from '../common/error-handler'

export const script = {
  command: 'script <file>',
  describe: 'Runs the given script in Sketch',
  builder: function (yargs) {
    yargs.positional('file', {
      type: 'string'
    })
  },
  handler: async function ({ file }) {
    await runScript([file]).catch(errorHandler)
    log.success('Ran script')
    return Promise.resolve()
  }
}
