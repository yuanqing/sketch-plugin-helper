import { runHandler } from '../common/run-handler'

export const run = {
  command: 'run <handler>',
  describe: 'Runs the given plugin handler in Sketch',
  builder: function (yargs) {
    yargs.positional('handler', {
      type: 'string'
    })
    yargs.option('shouldRunInBackground', {
      alias: ['background', 'b'],
      default: false,
      describe: 'Whether to run the plugin in the background',
      type: 'boolean'
    })
  },
  handler: async function ({ handler: handlerName, shouldRunInBackground }) {
    return runHandler({ handlerName, shouldRunInBackground })
  }
}
